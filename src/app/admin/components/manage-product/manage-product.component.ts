import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../shared/services/products.service';
import { ProductType } from '../../../shared/types/product.type';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-manage-product',
  imports: [TitleCasePipe, ReactiveFormsModule],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css'
})
export class ManageProductComponent {
  public mode!: 'add' | 'edit';
  public productId!: String;
  public productForm!: FormGroup
  public invalidForm: Boolean = false
  constructor(
    private activatedRoute: ActivatedRoute,
    private fromBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private domTitle: Title
  ) {
    this.createFrom();

    this.activatedRoute.paramMap.subscribe(params => {
      let id = String(params.get('id'));
      if (id == 'add') {
        this.mode = 'add';
        this.productForm?.reset();
      } else {
        this.mode = 'edit';
        this.productId = id;
      }
    });

    // Change page title
    this.domTitle.setTitle(`Admin - ${this.mode[0].toUpperCase()+this.mode.slice(1)} Product`);

    if (this.mode == 'edit') {
        this.productsService.get(this.productId).subscribe(data => {
          // type assertion is the hell it self, but it makes every thing works fine
          (data as ProductType)['price'] = (data as ProductType)['price'].slice(1); // remove '$' from price
          ((data as ProductType)['images'] as any) = (data as ProductType)['images'].join('\n');
          // let {id, ...newData} = data as ProductType
          // this.productForm.setValue(newData);
          // better way than above
          Reflect.deleteProperty(data, 'id')
          this.productForm.setValue(data);
      });
    }
  }

  productAction(event: SubmitEvent) {
    event.preventDefault();
    if (this.productForm.invalid) {
      this.invalidForm = true
    } else {
      this.invalidForm = false
      let pf = this.productForm.value;
      pf['price'] = '$'+pf['price']
      pf['images'] = pf['images'].split('\n').map((i: string) => i.trim());
      if (this.mode == 'add') {
        this.addProduct();
      } else {
        this.editProduct();
      }
    }
  }

  private addProduct() {
    this.productsService.add(this.productForm.value).subscribe(data => {
      // console.log(data);
      this.router.navigate(['admin/products'])
    });
  }

  private editProduct() {
    this.productsService.edit(this.productId, this.productForm.value).subscribe(data => {
      this.router.navigate(['admin/products'])
    });
  }

  get formControls() {
    return this.productForm.controls;
  }

  createFrom() {
    this.productForm = this.fromBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      price: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d+$/)
        ]
      ],
      category: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10)
        ]
      ],
      images: [
        '',
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ],
      available: [ false ]
    });
  }
}

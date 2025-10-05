import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../../shared/services/products.service';
import { ProductType } from '../../../shared/types/product.type';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  public products!: ProductType[];
  public totalPrice: number = 0;
  public allCategories: String[] = [];
  public productIdToDelete!: String | Number;
  constructor(
    private productsService: ProductsService,
    private domTtitle: Title
  ) {
    this.domTtitle.setTitle('Admin - Products');
    this.productsService.products().subscribe(data => {
      this.products = data as ProductType[];

      this.products?.map(i => {
        this.totalPrice += Number(i.price.slice(1))
        if (!this.allCategories.includes(i.category)) {
          this.allCategories.push(i.category);
        }
      });

    });
  }

  deleteProduct() {
    this.productsService.delete(this.productIdToDelete).subscribe(data => {
      // console.log(data);
      this.products.splice(this.products.findIndex(p => p.id == this.productIdToDelete), 1);
    });
  }
}

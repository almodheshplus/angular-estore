import { Component } from '@angular/core';
import { ProductsService } from '../../../shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { ProductType } from '../../../shared/types/product.type';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  // private pid =
  public productData!: ProductType;
  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    public cartService: CartService
  ) {
    this.loadProduct();
  }

  private loadProduct() {
    this.activatedRoute.paramMap.subscribe(param => {
      let pid = param.get('id')
      this.productsService.get(pid as String).subscribe(data => {
        this.productData = data as ProductType;
    });
    });
  }
}

import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../../shared/services/products.service';
import { ProductType } from '../../../shared/types/product.type';
import { AdminRoutesModule } from "../../../admin/routes/routes.module";

@Component({
  selector: 'app-cart',
  imports: [AdminRoutesModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  public products: ProductType[] = [];
  public totalPrice: number = 0;
  constructor(
    private cartService: CartService,
    private productsService: ProductsService
  ) { this.getProductsData(); }

  private getProductsData() {
    for (const pid of this.cartService.all()) {
      this.productsService.get(pid).subscribe(data => {
        this.products.push(data as ProductType);
        this.totalPrice += Number((data as ProductType).price.slice(1));
      });
    }
  }

  public deleteProductFromCart(id: Number) {
    this.cartService.delete(id);
    let i = this.products.findIndex(i => i.id == id);
    this.products.splice(i, 1);
  }

  public clearCart() {
    this.cartService.clear();
    this.products = [];
  }
}

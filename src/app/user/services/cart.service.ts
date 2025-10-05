import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  all(): Number[] {
    const cart = window.localStorage.getItem('cart') || '[]';
    return JSON.parse(cart);
  }

  clear() {
    window.localStorage.setItem('cart', '[]')
  }

  add(productId: Number) {
    let cart = this.all();
    if (!this.isAdded(productId, cart)) {
      cart.push(productId);
      window.localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  delete(productId: Number) {
    let cart = this.all();
    const i = cart.indexOf(productId);
    cart.splice(i, 1);
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }

  isAdded(productId: Number, cart?: Number[]): Boolean {
    return Boolean((cart ? cart: this.all()).find(i => i == productId));
  }
}

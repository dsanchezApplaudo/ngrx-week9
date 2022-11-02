import { Cart } from 'src/app/models,types,interfaces/models/cart.model';

export class CartStorage {
  setCart(cart: Cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      return JSON.parse(cart);
    }
  }
}

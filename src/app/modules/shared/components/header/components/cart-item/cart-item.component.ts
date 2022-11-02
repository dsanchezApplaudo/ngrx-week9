import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartItem } from 'src/app/models,types,interfaces/models/cartItem.model';
import { AppState } from 'src/app/store/app.store';
import { AddCartItem, RemoveCartItem } from 'src/app/store/cart/cart.actions';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() name!: string;
  @Input() imageUrl!: string;
  @Input() quantity!: number;
  @Input() price!: number;
  @Input() productId!: number;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  arrowClick(command: string) {
    const { name, price, productId, imageUrl } = this;
    const cartItem = new CartItem(name, 1, price, 1, productId, 0, imageUrl);
    if (command == 'add') {
      this.store.dispatch(AddCartItem({ payload: cartItem }));
    } else if (command == 'remove') {
      this.store.dispatch(RemoveCartItem({ payload: productId }));
    }
  }
}

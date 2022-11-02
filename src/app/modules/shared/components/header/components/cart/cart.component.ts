import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models,types,interfaces/models/cartItem.model';
import { AppState } from 'src/app/store/app.store';
import { ToggleCart } from 'src/app/store/cart/cart.actions';
import {
  selectCartEmpty,
  selectCartItems,
} from 'src/app/store/cart/cart.selector';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  empty$!: Observable<boolean>;
  cartItems$!: Observable<CartItem[]>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.cartItems$ = this.store.select(selectCartItems);
    this.empty$ = this.store.select(selectCartEmpty);
  }

  handleClick() {
    this.store.dispatch(ToggleCart());
    this.router.navigate(['/checkout']);
  }
}

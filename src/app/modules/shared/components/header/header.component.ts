import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.store';
import { ToggleCart } from 'src/app/store/cart/cart.actions';
import {
  selectCartHidden,
  selectCartItemsNumber,
} from 'src/app/store/cart/cart.selector';
import {
  selectCurrentUser,
  selectLoggedIn,
} from 'src/app/store/currentUser/currentUser.selector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  cartHidden$!: Observable<boolean>;
  cartNumberItems$!: Observable<number>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.cartHidden$ = this.store.select(selectCartHidden);
    this.isLoggedIn$ = this.store.select(selectLoggedIn);
    this.cartNumberItems$ = this.store.select(selectCartItemsNumber);
  }

  toggleCart() {
    this.store.dispatch(ToggleCart());
  }
}

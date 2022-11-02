import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { forkJoin, Observable, take } from 'rxjs';
import { ICartItemsToOrder } from 'src/app/models,types,interfaces/interfaces/requests/cartRequest.interface';
import { CartItem } from 'src/app/models,types,interfaces/models/cartItem.model';
import { CartHttpService } from 'src/app/services/http/cart-http.service';
import { DialogService } from 'src/app/services/toast/dialog.service';
import { AppState } from 'src/app/store/app.store';
import { ClearCart } from 'src/app/store/cart/cart.actions';
import {
  selectCartEmpty,
  selectCartItems,
  selectCartItemsTotal,
  selectCartToOrder,
} from 'src/app/store/cart/cart.selector';
import { selectLoggedIn } from 'src/app/store/currentUser/currentUser.selector';
import { SetRedirect } from 'src/app/store/redirect/redirect.actions';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cart$!: Observable<CartItem[]>;
  cartTotal$!: Observable<number>;
  loggedIn$!: Observable<boolean>;
  cartDispatch$!: Observable<ICartItemsToOrder[]>;
  cartEmpty$!: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private dialogService: DialogService,
    private cartHttp: CartHttpService
  ) {}

  ngOnInit(): void {
    this.cart$ = this.store.select(selectCartItems);
    this.cartTotal$ = this.store.select(selectCartItemsTotal);
    this.loggedIn$ = this.store.select(selectLoggedIn);
    this.cartDispatch$ = this.store.select(selectCartToOrder);
    this.cartEmpty$ = this.store.select(selectCartEmpty);
  }

  handlePlaceOrder() {
    forkJoin([
      this.cartDispatch$.pipe(take(1)),
      this.loggedIn$.pipe(take(1)),
    ]).subscribe(([cart, loggedIn]) => {
      if (loggedIn && cart.length > 0) {
        this.cartHttp.postAddCart(cart).subscribe((value) => {
          this.store.dispatch(ClearCart());
          this.router.navigate(['/products']);
        });
      } else {
        this.dialogService.open(this.router.url);
      }
    });
  }
}

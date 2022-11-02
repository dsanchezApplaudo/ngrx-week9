import { createSelector } from '@ngrx/store';
import { ICartItemsToOrder } from 'src/app/models,types,interfaces/interfaces/requests/cartRequest.interface';
import { CartItem } from 'src/app/models,types,interfaces/models/cartItem.model';
import { AppState } from '../app.store';
import { CartState } from './cart.reducer';

export const selectCart = (state: AppState) => state.cart;

export const selectCartItems = createSelector(
  selectCart,
  (state: CartState) => state.cartItems
);

export const selectCartHidden = createSelector(
  selectCart,
  (state: CartState) => state.hidden
);

export const selectCartItemsTotal = createSelector(
  selectCartItems,
  (cartItems: CartItem[]) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) => accumulatedQuantity + +cartItem.total,
      0
    )
);

export const selectCartItemsNumber = createSelector(
  selectCartItems,
  (CartItems: CartItem[]) =>
    CartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        (accumulatedQuantity += cartItem.quantity),
      0
    )
);

export const selectCartEmpty = createSelector(
  selectCart,
  (state: CartState) => !(state.cartItems.length > 0)
);

export const selectCartToOrder = createSelector(
  selectCartItems,
  (state: CartItem[]) =>
    state.reduce((accumulatedCart: ICartItemsToOrder[], cartItem) => {
      let object = {
        product_variant_id: cartItem.product_id,
        quantity: cartItem.quantity,
      };
      return [...accumulatedCart, object];
    }, [])
);

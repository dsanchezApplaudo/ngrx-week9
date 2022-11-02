import { Action, createAction, props } from '@ngrx/store';
import { CartItem } from 'src/app/models,types,interfaces/models/cartItem.model';
import { CartActionTypes } from './cart.types';

export const ToggleCart = createAction(CartActionTypes.TOGGLE_CART);

export const AddCartItem = createAction(
  CartActionTypes.ADD_CART_ITEM,
  props<{ payload: CartItem }>()
);

export const RemoveCartItem = createAction(
  CartActionTypes.REMOVE_CART_ITEM,
  props<{ payload: number }>()
);

export const ClearCartItem = createAction(
  CartActionTypes.CLEAR_CART_ITEM,
  props<{ payload: number }>()
);

export const ClearCart = createAction(CartActionTypes.CLEAR_CART);

// export class ToggleCart implements Action {
//   readonly type = CartActionTypes.TOGGLE_CART;
// }

// export class AddCartItem implements Action {
//   readonly type = CartActionTypes.ADD_CART_ITEM;
//   constructor(public payload: CartItem) {}
// }

// export class RemoveCartItem implements Action {
//   readonly type = CartActionTypes.REMOVE_CART_ITEM;
//   constructor(public payload: number) {}
// }

// export class ClearCartItem implements Action {
//   readonly type = CartActionTypes.CLEAR_CART_ITEM;
//   constructor(public payload: number) {}
// }

// export class ClearCart implements Action {
//   readonly type = CartActionTypes.CLEAR_CART;
// }

// export type CartActions =
//   | ToggleCart
//   | AddCartItem
//   | RemoveCartItem
//   | ClearCartItem
//   | ClearCart;

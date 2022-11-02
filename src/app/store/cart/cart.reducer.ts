import { createReducer, on } from '@ngrx/store';
import { CartItem } from 'src/app/models,types,interfaces/models/cartItem.model';
// import { CartActions, ToggleCart } from './cart.actions';
import { CartActionTypes } from './cart.types';
import { CartUtils } from './cart.utils';

import * as CartActions from './cart.actions';

export type CartState = {
  hidden: boolean;
  cartItems: CartItem[];
};

const initialState: CartState = {
  hidden: true,
  cartItems: [],
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.ToggleCart, (state) => ({ ...state, hidden: !state.hidden })),
  on(CartActions.AddCartItem, (state, action) => ({
    ...state,
    cartItems: CartUtils.addItemToCart(state.cartItems, action.payload),
  })),
  on(CartActions.RemoveCartItem, (state, action) => ({
    ...state,
    cartItems: CartUtils.removeItemFromCart(state.cartItems, action.payload),
  })),
  on(CartActions.ClearCartItem, (state, action) => ({
    ...state,
    cartItems: CartUtils.clearItem(state.cartItems, action.payload),
  })),
  on(CartActions.ClearCart, (state) => ({
    ...state,
    cartItems: [],
  }))
);

// export const cartReducer = (
//   state: CartState = initialState,
//   action: CartActions
// ) => {
//   switch (action.type) {
//     case CartActionTypes.TOGGLE_CART:
//       return {
//         ...state,
//         hidden: !state.hidden,
//       };
//     case CartActionTypes.ADD_CART_ITEM:
//       return {
//         ...state,
//         cartItems: CartUtils.addItemToCart(state.cartItems, action.payload),
//       };
//     case CartActionTypes.REMOVE_CART_ITEM:
//       return {
//         ...state,
//         cartItems: CartUtils.removeItemFromCart(
//           state.cartItems,
//           action.payload
//         ),
//       };
//     case CartActionTypes.CLEAR_CART_ITEM:
//       return {
//         ...state,
//         cartItems: CartUtils.clearItem(state.cartItems, action.payload),
//       };
//     case CartActionTypes.CLEAR_CART:
//       return {
//         ...state,
//         cartItems: [],
//       };
//     default:
//       return state;
//   }
// };

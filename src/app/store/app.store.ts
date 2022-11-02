import { ActionReducerMap } from '@ngrx/store';
import { cartReducer, CartState } from './cart/cart.reducer';
import {
  categoriesReducer,
  CategoriesState,
} from './categories/categories.reducer';
import {
  currentUserReducer,
  CurrentUserState,
} from './currentUser/currentUser.reducer';
import { productsReducer, ProductsState } from './products/products.reducer';
import { redirectReducer, RedirectState } from './redirect/redirect.reducer';

export interface AppState {
  currentUser: CurrentUserState;
  products: ProductsState;
  cart: CartState;
  redirect: RedirectState;
  categories: CategoriesState;
}

export const storeReducer: ActionReducerMap<AppState> = {
  currentUser: currentUserReducer,
  products: productsReducer,
  cart: cartReducer,
  redirect: redirectReducer,
  categories: categoriesReducer,
};

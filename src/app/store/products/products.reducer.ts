import { createReducer, on } from '@ngrx/store';
import { IMeta } from 'src/app/models,types,interfaces/interfaces/meta.interface';
import { Product } from 'src/app/models,types,interfaces/models/product.model';
// import { ProductsActions } from './products.actions';
import { ProductsActionTypes } from './products.types';

import * as ProductsActions from './products.actions';

export interface ProductsState {
  isLoading: boolean;
  products: Product[];
  meta: IMeta | null;
  productErrors: string | null;
}

const initialState: ProductsState = {
  isLoading: false,
  products: [],
  meta: null,
  productErrors: null,
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.FetchProductsStart, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ProductsActions.FetchProductsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    productErrors: null,
    meta: action.payload.meta,
    products: action.payload.data,
  })),
  on(ProductsActions.FetchProductsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    productErrors: action.payload,
  }))
);

// export const productsReducer = (
//   state = initialState,
//   action: ProductsActions
// ): ProductsState => {
//   switch (action.type) {
//     case ProductsActionTypes.FETCH_PRODUCTS_START:
//       return {
//         ...state,
//         isLoading: true,
//       };
//     case ProductsActionTypes.FETCH_PRODUCTS_SUCCESS:
//       return {
//         ...state,
//         isLoading: false,
//         productErrors: null,
//         meta: action.payload.meta,
//         products: action.payload.data,
//       };
//     case ProductsActionTypes.FETCH_PRODUCTS_FAILURE:
//       return {
//         ...state,
//         isLoading: false,
//         productErrors: action.payload,
//       };
//     default:
//       return state;
//   }
// };

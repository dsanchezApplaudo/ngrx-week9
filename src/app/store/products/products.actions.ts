import { ParamMap } from '@angular/router';
import { createAction, props } from '@ngrx/store';
import { IMeta } from 'src/app/models,types,interfaces/interfaces/meta.interface';
import { Product } from 'src/app/models,types,interfaces/models/product.model';
import { ProductsActionTypes } from './products.types';

export const FetchProductsStart = createAction(
  ProductsActionTypes.FETCH_PRODUCTS_START,
  props<{ payload: ParamMap }>()
);

export const FetchProductsSuccess = createAction(
  ProductsActionTypes.FETCH_PRODUCTS_SUCCESS,
  props<{ payload: { data: Product[]; meta: IMeta } }>()
);

export const FetchProductsFailure = createAction(
  ProductsActionTypes.FETCH_PRODUCTS_FAILURE,
  props<{ payload: string }>()
);

// export class FetchProductsStart implements Action {
//   readonly type = ProductsActionTypes.FETCH_PRODUCTS_START;
//   constructor(public payload: ParamMap) {}
// }

// export class FetchProductsSuccess implements Action {
//   readonly type = ProductsActionTypes.FETCH_PRODUCTS_SUCCESS;
//   constructor(public payload: { data: Product[]; meta: IMeta }) {}
// }

// export class FetchProductsFailure implements Action {
//   readonly type = ProductsActionTypes.FETCH_PRODUCTS_FAILURE;
//   constructor(public payload: string) {}
// }

// export type ProductsActions =
//   | FetchProductsStart
//   | FetchProductsSuccess
//   | FetchProductsFailure;

import { createSelector } from '@ngrx/store';
import { AppState } from '../app.store';
import { ProductsState } from './products.reducer';

export const selectProductsState = (state: AppState) => state.products;

export const selectProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => state.products
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state: ProductsState) => state.isLoading
);

export const selectProductsErrors = createSelector(
  selectProductsState,
  (state: ProductsState) => state.productErrors
);

export const selectProductsMeta = createSelector(
  selectProductsState,
  (state: ProductsState) => state.meta
);

import { createSelector } from '@ngrx/store';
import { AppState } from '../app.store';
import { CategoriesState } from './categories.reducer';

export const selectCategoriesState = (state: AppState) => state.categories;

export const selectCategories = createSelector(
  selectCategoriesState,
  (state: CategoriesState) => state.categories
);

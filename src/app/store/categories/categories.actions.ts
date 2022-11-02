import { Action, createAction, props } from '@ngrx/store';
import { IMeta } from 'src/app/models,types,interfaces/interfaces/meta.interface';
import { Category } from 'src/app/models,types,interfaces/models/category.model';
import { CategoryActionTypes } from './categories.types';

export const FetchCategoriesStart = createAction(
  CategoryActionTypes.FETCH_CATEGORIES_START
);

export const FetchCategoriesSuccess = createAction(
  CategoryActionTypes.FETCH_CATEGORIES_SUCCESS,
  props<{ payload: { data: Category[]; meta: IMeta } }>()
);

export const FetchCategoriesFailure = createAction(
  CategoryActionTypes.FETCH_CATEGORIES_FAILURE,
  props<{ payload: string }>()
);

// export class FetchCategoriesStart implements Action {
//   readonly type = CategoryActionTypes.FETCH_CATEGORIES_START;
// }

// export class FetchCategoriesSuccess implements Action {
//   readonly type = CategoryActionTypes.FETCH_CATEGORIES_SUCCESS;
//   constructor(public payload: { data: Category[]; meta: IMeta }) {}
// }

// export class FetchCategoriesFailure implements Action {
//   readonly type = CategoryActionTypes.FETCH_CATEGORIES_FAILURE;
//   constructor(public payload: string) {}
// }

// export type CategoriesActions =
//   | FetchCategoriesStart
//   | FetchCategoriesSuccess
//   | FetchCategoriesFailure;

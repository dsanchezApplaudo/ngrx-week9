import { IMeta } from 'src/app/models,types,interfaces/interfaces/meta.interface';
import { Category } from 'src/app/models,types,interfaces/models/category.model';
// import { CategoriesActions } from './categories.actions';
import { CategoryActionTypes } from './categories.types';
import * as CategoriesActions from './categories.actions';
import { createReducer, on } from '@ngrx/store';

export interface CategoriesState {
  isLoading: boolean;
  categories: Category[];
  meta: IMeta | null;
  categoriesErrors: string | null;
}

const initialState: CategoriesState = {
  isLoading: false,
  categories: [],
  meta: null,
  categoriesErrors: null,
};

export const categoriesReducer = createReducer(
  initialState,
  on(CategoriesActions.FetchCategoriesStart, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(CategoriesActions.FetchCategoriesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    categories: action.payload.data,
    meta: action.payload.meta,
    categoriesErrors: null,
  })),
  on(CategoriesActions.FetchCategoriesFailure, (state, action) => ({
    ...state,
    isLoading: false,
    categories: [],
    meta: null,
    categoriesErrors: action.payload,
  }))
);

// export const categoriesReducer = (
//   state = initialState,
//   action: CategoriesActions
// ): CategoriesState => {
//   switch (action.type) {
//     case CategoryActionTypes.FETCH_CATEGORIES_START:
//       return {
//         ...state,
//         isLoading: true,
//       };
//     case CategoryActionTypes.FETCH_CATEGORIES_SUCCESS:
//       return {
//         ...state,
//         isLoading: false,
//         categories: action.payload.data,
//         meta: action.payload.meta,
//         categoriesErrors: null,
//       };
//     case CategoryActionTypes.FETCH_CATEGORIES_FAILURE:
//       return {
//         ...state,
//         isLoading: false,
//         categories: [],
//         meta: null,
//         categoriesErrors: action.payload,
//       };

//     default:
//       return state;
//   }
// };

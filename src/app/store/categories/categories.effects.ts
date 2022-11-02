import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CategoriesHttpService } from 'src/app/services/http/categories-http.service';
import { ProducstUtilsService } from '../products/products.utils';
import {
  FetchCategoriesFailure,
  FetchCategoriesSuccess,
} from './categories.actions';
import { CategoryActionTypes } from './categories.types';

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private categoriesHttpService: CategoriesHttpService,
    private productsUtils: ProducstUtilsService
  ) {}

  fetchCategories = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActionTypes.FETCH_CATEGORIES_START),
      switchMap(() => {
        return this.categoriesHttpService.getAllCategories().pipe(
          map((categories) => {
            return FetchCategoriesSuccess({ payload: categories });
          }),
          catchError((errorResponse) => {
            const errorMessage = this.productsUtils.handleErrors(errorResponse);
            return of(FetchCategoriesFailure({ payload: errorMessage }));
          })
        );
      })
    )
  );
}

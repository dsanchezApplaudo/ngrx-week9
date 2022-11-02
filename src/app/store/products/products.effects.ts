import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { IProductsResponse } from 'src/app/models,types,interfaces/interfaces/responses/productsResponse.interface';
import { ProductsHttpService } from 'src/app/services/http/products-http.service';
import { FetchProductsFailure, FetchProductsSuccess } from './products.actions';
import { ProductsActionTypes } from './products.types';
import { ProducstUtilsService } from './products.utils';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsHttpService: ProductsHttpService,
    private productsUtils: ProducstUtilsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  productsQueries = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductsActionTypes.FETCH_PRODUCTS_SUCCESS),
        tap((productsResponse: { payload: IProductsResponse }) => {
          const total = productsResponse.payload.meta.total;
          if (total < 12) {
            this.router.navigate([], {
              queryParams: { page: 1 },
              queryParamsHandling: 'merge',
            });
          }
        })
      ),
    { dispatch: false }
  );

  fetchProducts = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActionTypes.FETCH_PRODUCTS_START),
      switchMap((fetchData: { payload: ParamMap }) => {
        return this.productsHttpService.getAllProducts(fetchData.payload).pipe(
          map((products) => {
            return FetchProductsSuccess({ payload: products });
          }),
          catchError((errorResponse) => {
            const errorMessage = this.productsUtils.handleErrors(errorResponse);
            return of(FetchProductsFailure({ payload: errorMessage }));
          })
        );
      })
    )
  );
}

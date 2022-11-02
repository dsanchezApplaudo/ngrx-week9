import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, switchMap, throwError } from 'rxjs';
import { ICartItemsToOrder } from 'src/app/models,types,interfaces/interfaces/requests/cartRequest.interface';
import { ErrorService } from '../errors/error.service';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class CartHttpService extends BaseHttpService {
  urlRest: string = 'cart';
  constructor(private http: HttpClient, private errorService: ErrorService) {
    super();
  }

  postAddCart(cartData: ICartItemsToOrder[]) {
    return this.deleteCart().pipe(
      switchMap(() => {
        return this.http
          .post(
            this.baseUrl + this.urlRest,
            { data: { items: cartData } },
            this.authRouteoOtions
          )
          .pipe(
            catchError((errorResponse) => {
              const errorMessage =
                this.errorService.handleErrors(errorResponse);
              return throwError(() => errorMessage);
            })
          );
      })
    );
  }

  deleteCart() {
    return this.http
      .delete(this.baseUrl + this.urlRest, this.authRouteoOtions)
      .pipe(
        catchError((error) => {
          return of(null);
        })
      );
  }
}

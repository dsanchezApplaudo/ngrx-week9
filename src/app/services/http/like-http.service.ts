import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ILikeResponse } from 'src/app/models,types,interfaces/interfaces/responses/likeResponse.interface';
import { Kind } from 'src/app/models,types,interfaces/types/kind.types';
import { ErrorService } from '../errors/error.service';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class LikeHttpService extends BaseHttpService {
  urlRest: string = 'likes';

  constructor(private http: HttpClient, private errorService: ErrorService) {
    super();
  }

  getLikes(productId: number, userId: number): Observable<ILikeResponse> {
    const url =
      this.baseUrl +
      this.urlRest +
      `?[filter][product_id_eq]=${productId}&[filter][user_id_eq]=${userId}`;
    return this.http.get<ILikeResponse>(url, this.authRouteoOtions).pipe(
      catchError((errorResponse) => {
        const errorMessage = this.errorService.handleErrors(errorResponse);
        return throwError(() => errorMessage);
      })
    );
  }

  postLikes(productToLike: {
    product_id: number;
    kind: Kind;
  }): Observable<ILikeResponse> {
    const url = this.baseUrl + this.urlRest;
    return this.http
      .post<ILikeResponse>(url, { data: productToLike }, this.authRouteoOtions)
      .pipe(
        catchError((errorResponse) => {
          const errorMessage = this.errorService.handleErrors(errorResponse);
          return throwError(() => errorMessage);
        })
      );
  }
}

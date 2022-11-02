import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { IProductsResponse } from 'src/app/models,types,interfaces/interfaces/responses/productsResponse.interface';
import { ISingleProductResponse } from 'src/app/models,types,interfaces/interfaces/responses/singleProductResponse.interface';
import { ErrorService } from '../errors/error.service';
import { BaseHttpService } from './base-http.service';
import { HttpUtils } from './http.utils';

@Injectable({
  providedIn: 'root',
})
export class ProductsHttpService extends BaseHttpService {
  urlRest = 'products';

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private httpUtils: HttpUtils
  ) {
    super();
  }

  getAllProducts(params: ParamMap): Observable<IProductsResponse> {
    const otherParams = this.httpUtils.getParams(params);
    let completeUrl =
      this.baseUrl +
      this.urlRest +
      '?include=image_attachment.blob,master,category&[page][size]=12' +
      otherParams;
    return this.http
      .get<IProductsResponse>(completeUrl, this.noAuthOptions)
      .pipe(
        catchError((errorResponse) => {
          const errorMessage = this.errorService.handleErrors(errorResponse);
          return throwError(() => errorMessage);
        })
      );
  }

  getProductsPerCategory(categoryId: number) {
    const completeUrl =
      this.baseUrl + this.urlRest + '?include=category' + categoryId;

    return this.http.get(completeUrl, this.noAuthOptions).pipe(
      catchError((errorResponse) => {
        const errorMessage = this.errorService.handleErrors(errorResponse);
        return throwError(() => errorMessage);
      })
    );
  }

  getSpecificProduct(slug: string): Observable<ISingleProductResponse> {
    const image = '?include=image_attachment.blob,category,master';
    return this.http
      .get<ISingleProductResponse>(
        this.baseUrl + this.urlRest + `/${slug}` + image
      )
      .pipe(
        catchError((errorResponse) => {
          const errorMessage = this.errorService.handleErrors(errorResponse);
          return throwError(() => errorMessage);
        })
      );
  }
}

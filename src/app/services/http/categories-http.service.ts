import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ICategoryResponse } from 'src/app/models,types,interfaces/interfaces/responses/categoriesResponse.interface';
import { ErrorService } from '../errors/error.service';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesHttpService extends BaseHttpService {
  urlRest: string = 'categories';

  constructor(private http: HttpClient, private errorService: ErrorService) {
    super();
  }

  getAllCategories(): Observable<ICategoryResponse> {
    const url = this.baseUrl + this.urlRest + '?&[page][size]=0';

    return this.http.get<ICategoryResponse>(url, this.noAuthOptions).pipe(
      catchError((errorResponse) => {
        const errorMessage = this.errorService.handleErrors(errorResponse);
        return throwError(() => errorMessage);
      })
    );
  }
}

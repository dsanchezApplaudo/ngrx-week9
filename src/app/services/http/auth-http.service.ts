import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ILogin } from 'src/app/models,types,interfaces/interfaces/login.interface';
import { ILoginResponse } from 'src/app/models,types,interfaces/interfaces/responses/loginResponse.interface';
import { ErrorService } from '../errors/error.service';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService extends BaseHttpService {
  urlRest: string = 'users/login';
  constructor(private http: HttpClient, private errorService: ErrorService) {
    super();
  }

  postLogin(loginInfo: ILogin): Observable<ILoginResponse> {
    return this.http
      .post<ILoginResponse>(
        this.baseUrl + this.urlRest,
        { data: loginInfo },
        this.noAuthOptions
      )
      .pipe(
        catchError((errorResponse) => {
          const errorMessage = this.errorService.handleErrors(errorResponse);
          return throwError(() => errorMessage);
        })
      );
  }
}

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStorage } from '../services/storage/user.storage';
@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = UserStorage.getToken();
    const authRoute = req.params.get('authRoute');

    if (!token || !authRoute) {
      return next.handle(req);
    }

    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(tokenizedRequest);
  }
}

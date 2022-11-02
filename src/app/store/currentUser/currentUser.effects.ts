import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, take, tap } from 'rxjs';
import { ILogin } from 'src/app/models,types,interfaces/interfaces/login.interface';
import { ILoginRequest } from 'src/app/models,types,interfaces/interfaces/requests/loginRequest.interface';
import { ILoginResponse } from 'src/app/models,types,interfaces/interfaces/responses/loginResponse.interface';
import { AuthHttpService } from 'src/app/services/http/auth-http.service';
import { AppState } from '../app.store';
import { ClearRedirect } from '../redirect/redirect.actions';
import { selectRedirectPath } from '../redirect/redirect.selectors';
import {
  SignInFailure,
  SignInStart,
  SignInSuccess,
  SignUpFailure,
  SignUpStart,
  SignUpSuccess,
} from './currentUser.actions';
import { AuthActionTypes } from './currentUser.types';
import { CurrentUserUtils } from './currentUser.utils';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private authHttpService: AuthHttpService,
    private store: Store<AppState>
  ) {}

  authSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.SIGN_IN_SUCCESS),
        tap(() => {
          let redirect;
          this.store
            .select(selectRedirectPath)
            .pipe(take(1))
            .subscribe((value) => {
              redirect = value;
            });
          if (redirect) {
            this.router.navigate([redirect]);
            this.store.dispatch(ClearRedirect());
          } else {
            this.router.navigate(['/home']);
          }
        })
      ),
    { dispatch: false }
  );

  registerSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActionTypes.SIGN_UP_SUCCESS),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  // authRegister = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(AuthActionTypes.SIGN_UP_START),
  //     switchMap((authData: SignUpStart) => {
  //       return this.authHttpService.postLogin(authData).pipe(
  //         map((resData) => {
  //           return new SignUpSuccess();
  //         }),
  //         catchError((errorRes) => {
  //           const errorMessage = this.currentUserErrors.handleErrors(errorRes);
  //           return of(new SignUpFailure(errorMessage));
  //         })
  //       );
  //     })
  //   )
  // );

  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActionTypes.SIGN_IN_START),
      switchMap((authData: { payload: ILogin }) => {
        return this.authHttpService.postLogin(authData.payload).pipe(
          map((resData: ILoginResponse) => {
            const currentUser = CurrentUserUtils.handleAuthentication(resData);
            return SignInSuccess({ payload: currentUser });
          }),
          catchError((errorRes) => {
            console.log(errorRes);
            // const errorMessage = this.currentUserErrors.handleErrors(errorRes);
            return of(SignInFailure({ payload: errorRes }));
          })
        );
      })
    )
  );
}

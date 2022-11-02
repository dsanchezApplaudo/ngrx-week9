// import { Action } from '@ngrx/store';
import { createAction, props } from '@ngrx/store';
import { ILogin } from 'src/app/models,types,interfaces/interfaces/login.interface';
import { IRegisterRequest } from 'src/app/models,types,interfaces/interfaces/requests/registerRequest.interface';
import { User } from 'src/app/models,types,interfaces/models/user.model';
import { AuthActionTypes } from './currentUser.types';

export const SignInStart = createAction(
  AuthActionTypes.SIGN_IN_START,
  props<{ payload: ILogin }>()
);

export const SignInSuccess = createAction(
  AuthActionTypes.SIGN_IN_SUCCESS,
  props<{ payload: User }>()
);

export const SignInFailure = createAction(
  AuthActionTypes.SIGN_IN_FAILURE,
  props<{ payload: string }>()
);

export const SignUpStart = createAction(
  AuthActionTypes.SIGN_UP_START,
  props<{ payload: IRegisterRequest }>()
);

export const SignUpSuccess = createAction(AuthActionTypes.SIGN_UP_SUCCESS);

export const SignUpFailure = createAction(
  AuthActionTypes.SIGN_UP_FAILURE,
  props<{ payload: string }>()
);

export const Logout = createAction(AuthActionTypes.LOGOUT);

// export class SignInStart implements Action {
//   readonly type = AuthActionTypes.SIGN_IN_START;
//   constructor(public payload: ILogin) {}
// }

// export class SignInSuccess implements Action {
//   readonly type = AuthActionTypes.SIGN_IN_SUCCESS;
//   constructor(public payload: User) {}
// }

// export class SignInFailure implements Action {
//   readonly type = AuthActionTypes.SIGN_IN_FAILURE;
//   constructor(public payload: string) {}
// }

// export class SignUpStart implements Action {
//   readonly type = AuthActionTypes.SIGN_UP_START;
//   constructor(public payload: IRegisterRequest) {}
// }

// export class SignUpSuccess implements Action {
//   readonly type = AuthActionTypes.SIGN_UP_SUCCESS;
// }

// export class SignUpFailure implements Action {
//   readonly type = AuthActionTypes.SIGN_UP_FAILURE;
//   constructor(public payload: string) {}
// }

// export class Logout implements Action {
//   readonly type = AuthActionTypes.LOGOUT;
// }

// export type CurrentUserActions =
//   | SignInStart
//   | SignInSuccess
//   | SignInFailure
//   | SignUpStart
//   | SignUpSuccess
//   | SignUpFailure
//   | Logout;

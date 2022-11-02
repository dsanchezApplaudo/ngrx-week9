import { User } from 'src/app/models,types,interfaces/models/user.model';
import { UserStorage } from 'src/app/services/storage/user.storage';
// import { CurrentUserActions } from './currentUser.actions';
import { AuthActionTypes } from './currentUser.types';

import * as CurrentUserActions from './currentUser.actions';
import { createReducer, on } from '@ngrx/store';

export interface CurrentUserState {
  isLoading: boolean;
  currentUser: User | null;
  authErrors: string | null;
  redirect: boolean;
}

const initialState: CurrentUserState = {
  isLoading: false,
  currentUser: UserStorage.getCurrentUser(),
  authErrors: null,
  redirect: false,
};

export const currentUserReducer = createReducer(
  initialState,
  on(
    CurrentUserActions.SignInStart || CurrentUserActions.SignUpStart,
    (state) => ({
      ...state,
      isLoading: true,
    })
  ),

  on(CurrentUserActions.SignInSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    authErrors: null,
    currentUser: action.payload,
  })),

  on(CurrentUserActions.SignUpSuccess, (state) => ({
    ...state,
    isLoading: false,
    authErrors: null,
    currentUser: null,
  })),

  on(
    CurrentUserActions.SignInFailure || CurrentUserActions.SignUpFailure,
    (state, action) => ({
      ...state,
      isLoading: false,
      authErrors: action.payload,
    })
  ),
  on(CurrentUserActions.Logout, (state) => ({
    ...state,
    currentUser: null,
  }))
);

// export const currentUserReducer = (
//   state = initialState,
//   action: CurrentUserActions
// ): CurrentUserState => {
//   switch (action.type) {
//     case AuthActionTypes.SIGN_IN_START:
//     case AuthActionTypes.SIGN_UP_START:
//       return {
//         ...state,
//         isLoading: true,
//       };
//     case AuthActionTypes.SIGN_IN_SUCCESS:
//       return {
//         ...state,
//         isLoading: false,
//         authErrors: null,
//         currentUser: action.payload,
//       };
//     case AuthActionTypes.SIGN_UP_SUCCESS:
//       return {
//         ...state,
//         isLoading: false,
//         authErrors: null,
//         currentUser: null,
//       };
//     case AuthActionTypes.SIGN_IN_FAILURE:
//     case AuthActionTypes.SIGN_UP_FAILURE:
//       return {
//         ...state,
//         isLoading: false,
//         authErrors: action.payload,
//       };
//     case AuthActionTypes.LOGOUT:
//       return {
//         ...state,
//         currentUser: null,
//       };
//     default:
//       return state;
//   }
// };

import { createSelector } from '@ngrx/store';
import { User } from 'src/app/models,types,interfaces/models/user.model';
import { AppState, storeReducer } from '../app.store';
import { CurrentUserState } from './currentUser.reducer';

export const selectCurrentUserState = (state: AppState) => state.currentUser;

export const selectCurrentUser = createSelector(
  selectCurrentUserState,
  (state: CurrentUserState) => state.currentUser
);

export const selectLoggedIn = createSelector(
  selectCurrentUserState,
  (state: CurrentUserState) => !!state.currentUser
);

export const selectUserLoading = createSelector(
  selectCurrentUserState,
  (state: CurrentUserState) => state.isLoading
);

export const selectUserErrors = createSelector(
  selectCurrentUserState,
  (state: CurrentUserState) => state.authErrors
);

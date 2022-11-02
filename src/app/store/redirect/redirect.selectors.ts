import { createSelector } from '@ngrx/store';
import { AppState } from '../app.store';
import { RedirectState } from './redirect.reducer';

export const selectRedirectState = (state: AppState) => state.redirect;

export const selectRedirect = createSelector(
  selectRedirectState,
  (state: RedirectState) => state.redirect
);

export const selectRedirectPath = createSelector(
  selectRedirectState,
  (state: RedirectState) => state.path
);

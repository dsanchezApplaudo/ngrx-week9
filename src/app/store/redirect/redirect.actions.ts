import { Action, createAction, props } from '@ngrx/store';
import { RedirectActionTypes } from './redirect.types';

export const SetRedirect = createAction(
  RedirectActionTypes.SET_REDIRECT,
  props<{ payload: string }>()
);

export const ClearRedirect = createAction(RedirectActionTypes.CLEAR_REDIRECT);

// export class SetRedirect implements Action {
//   readonly type = RedirectActionTypes.SET_REDIRECT;
//   constructor(public payload: string) {}
// }

// export class ClearRedirect implements Action {
//   readonly type = RedirectActionTypes.CLEAR_REDIRECT;
// }

// export type RedirectActions = SetRedirect | ClearRedirect;

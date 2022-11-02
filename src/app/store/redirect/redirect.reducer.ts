// import { RedirectActions } from './redirect.actions';
import { createReducer, on } from '@ngrx/store';
import { RedirectActionTypes } from './redirect.types';
import * as RedirectActions from './redirect.actions';

export interface RedirectState {
  redirect: boolean;
  path: string | null;
}

const initialState: RedirectState = {
  redirect: false,
  path: null,
};

export const redirectReducer = createReducer(
  initialState,
  on(RedirectActions.SetRedirect, (state, action) => ({
    ...state,
    redirect: true,
    path: action.payload,
  })),
  on(RedirectActions.ClearRedirect, (state) => ({
    ...state,
    redirect: false,
    path: null,
  }))
);

// export const redirectReducer = (
//   state = initialState,
//   action: RedirectActions
// ): RedirectState => {
//   switch (action.type) {
//     case RedirectActionTypes.SET_REDIRECT:
//       return {
//         ...state,
//         redirect: true,
//         path: action.payload,
//       };
//     case RedirectActionTypes.CLEAR_REDIRECT:
//       return {
//         ...state,
//         redirect: false,
//         path: null,
//       };
//     default:
//       return state;
//   }
// };

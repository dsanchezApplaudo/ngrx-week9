import { ActionReducer, MetaReducer, State } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AppState } from '../app.store';

export const localStorageSyncReducer = (
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> => {
  return localStorageSync({
    keys: [
      {
        cart: ['cartItems'],
      },
    ],
    rehydrate: true,
  })(reducer);
};

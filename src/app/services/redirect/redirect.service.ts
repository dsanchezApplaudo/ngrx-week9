import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.store';
import { SetRedirect } from 'src/app/store/redirect/redirect.actions';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  constructor(private store: Store<AppState>, private router: Router) {}

  handleRedirect(currentPath: string) {
    this.store.dispatch(SetRedirect({ payload: currentPath }));
    this.router.navigate(['/login']);
  }
}

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { AppState } from 'src/app/store/app.store';
import { selectCurrentUser } from 'src/app/store/currentUser/currentUser.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.pipe(
      take(1),
      map((state) => {
        const authorized = !!selectCurrentUser(state);
        if (authorized) {
          return true;
        }
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}

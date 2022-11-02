import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { UserStorage } from 'src/app/services/storage/user.storage';
import { AppState } from 'src/app/store/app.store';
import { Logout } from 'src/app/store/currentUser/currentUser.actions';
import { selectCurrentUser } from 'src/app/store/currentUser/currentUser.selector';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss'],
})
export class UserDropdownComponent implements OnInit {
  username$!: Observable<string>;
  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.username$ = this.store
      .select(selectCurrentUser)
      .pipe(map((user) => (user ? user.name : '')));
  }

  handleLogout() {
    this.store.dispatch(Logout());
    UserStorage.clearUser();
    this.router.navigate(['/login']);
  }
}

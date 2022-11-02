import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, tap } from 'rxjs';
import { AppState } from 'src/app/store/app.store';
import { Store } from '@ngrx/store';
import { SignInStart } from 'src/app/store/currentUser/currentUser.actions';
import { selectUserLoading } from 'src/app/store/currentUser/currentUser.selector';
import { ILoginRequest } from 'src/app/models,types,interfaces/interfaces/requests/loginRequest.interface';
import { ILogin } from 'src/app/models,types,interfaces/interfaces/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  visiblePassword: boolean = false;
  loading$!: Observable<boolean>;
  redirect$!: Observable<string>;
  loginForm = new FormGroup({
    email: new FormControl('trainee1@example.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('Trainee$1', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loading$ = this.store.select(selectUserLoading);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.store.dispatch(
        SignInStart({ payload: <ILogin>this.loginForm.value })
      );
    }
  }

  toggleVisibility() {
    this.visiblePassword = !this.visiblePassword;
  }

  getControl(name: string) {
    return <FormControl>this.loginForm.get(name);
  }
}

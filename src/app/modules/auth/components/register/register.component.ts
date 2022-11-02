import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import { CustomValidatorsService } from 'src/app/services/validators/custom-validators.service';
import { AppState } from 'src/app/store/app.store';
import { SignUpStart } from 'src/app/store/currentUser/currentUser.actions';
import { selectUserLoading } from 'src/app/store/currentUser/currentUser.selector';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  registerSubscription!: Subscription;
  loading: boolean = false;

  visiblePassword: boolean = false;
  visibleConfirm: boolean = false;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      [CustomValidatorsService.passwordsMatch('password', 'confirmPassword')]
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
    }
  }

  toggleVisibility(name: string) {
    if (name === 'password') {
      this.visiblePassword = !this.visiblePassword;
    } else {
      this.visibleConfirm = !this.visibleConfirm;
    }
  }

  getControl(name: string) {
    return <FormControl>this.registerForm.get(name);
  }
}

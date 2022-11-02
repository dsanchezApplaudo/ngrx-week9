import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorsService {
  constructor() {}

  static passwordsMatch(
    passwordName: string,
    confirmPasswordName: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(passwordName)?.value;
      const confirmPassword = control.get(confirmPasswordName)?.value;
      const confirmPasswordControl = control.get(
        confirmPasswordName
      ) as FormControl;
      if (password !== confirmPassword) {
        confirmPasswordControl.setErrors({ passwordsMatch: true });
        return null;
      }
      return null;
    };
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SnackbarService } from '../toast/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private snackbar: SnackbarService) {}

  handleErrors(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An Unknown error occurred';
    if (!errorResponse.error.errors && !errorResponse.error.errors[0].message) {
      this.snackbar.openSnackBar(errorMessage);
      return errorMessage;
    }
    errorMessage = errorResponse.error.errors[0].message;
    this.snackbar.openSnackBar(errorMessage);
    return errorMessage;
  }

  handleUnauthorizedError(errorResponse: any) {
    // this.currentUser.setCurrentUser = null;
    // this.router.navigate(['/home']);
    return this.handleErrors(errorResponse);
  }
}

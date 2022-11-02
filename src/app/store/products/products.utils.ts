import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SnackbarService } from 'src/app/services/toast/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class ProducstUtilsService {
  constructor(private snackbar: SnackbarService) {}

  handleErrors(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An Unknown error occurred';
    if (!errorResponse.error.error && !errorResponse.error.message) {
      this.snackbar.openSnackBar(errorMessage);
      return errorMessage;
    }
    errorMessage = errorResponse.error.message;
    this.snackbar.openSnackBar(errorMessage);
    return errorMessage;
  }
}

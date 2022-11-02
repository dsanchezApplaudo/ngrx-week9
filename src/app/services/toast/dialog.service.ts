import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DialogComponent } from 'src/app/modules/shared/components/dialog/dialog.component';
import { AppState } from 'src/app/store/app.store';
import { SetRedirect } from 'src/app/store/redirect/redirect.actions';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private store: Store<AppState>
  ) {}

  open(redirectLink: string) {
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'true') {
        this.store.dispatch(SetRedirect({ payload: redirectLink }));
        this.router.navigate(['/login']);
        return;
      } else {
        return;
      }
    });
  }
}

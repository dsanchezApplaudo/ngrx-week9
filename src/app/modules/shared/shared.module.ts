import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/header/components/cart/cart.component';
import { UserDropdownComponent } from './components/header/components/user-dropdown/user-dropdown.component';
import { CartItemComponent } from './components/header/components/cart-item/cart-item.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    PaginationComponent,
    DialogComponent,
    HeaderComponent,
    UserDropdownComponent,
    CartComponent,
    CartItemComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
  ],
  exports: [
    PaginationComponent,
    DialogComponent,
    HeaderComponent,
    UserDropdownComponent,
    CartComponent,
    CartItemComponent,
  ],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/modules/auth/components/login/login.component';
import { RegisterComponent } from 'src/app/modules/auth/components/register/register.component';
import { ValidationErrorsComponent } from 'src/app/modules/auth/components/validationErrors/validationErrors.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LoadSpinnerComponent } from './components/load-spinner/load-spinner.component';
import { AppRoutingModule } from '../../app.routing';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ValidationErrorsComponent,
    LoadSpinnerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    AppRoutingModule,
    MatCardModule,
  ],
})
export class AuthModule {}

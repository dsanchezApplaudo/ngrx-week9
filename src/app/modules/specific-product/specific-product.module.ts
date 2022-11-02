import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecificProductComponent } from './components/specific-product/specific-product.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SpecificProductComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class SpecificProductModule {}

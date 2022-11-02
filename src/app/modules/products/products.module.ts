import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { MatPaginatorModule } from '@angular/material/paginator';
import { FilterComponent } from './components/filter/filter.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductCardComponent,
    AllProductsComponent,
    FilterComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    SharedModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatExpansionModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
})
export class ProductsModule {}

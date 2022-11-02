import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutCardComponent } from './components/checkout-card/checkout-card.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CheckoutComponent, CheckoutCardComponent],
  imports: [CommonModule, MatButtonModule],
})
export class CheckoutModule {}

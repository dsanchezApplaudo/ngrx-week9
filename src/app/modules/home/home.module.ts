import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'src/app/modules/home/components/home/home.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, MatCardModule],
})
export class HomeModule {}

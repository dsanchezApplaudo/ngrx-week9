import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-errors',
  templateUrl: './validationErrors.component.html',
  styleUrls: ['./validationErrors.component.scss'],
})
export class ValidationErrorsComponent {
  @Input() control!: FormControl;
}

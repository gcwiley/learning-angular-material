import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-input-errors',
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.scss'],
})
export class InputErrorsComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
}

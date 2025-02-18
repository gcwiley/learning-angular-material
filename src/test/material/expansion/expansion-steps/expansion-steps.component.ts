import { Component } from '@angular/core';

@Component({
  selector: 'app-expansion-steps',
  templateUrl: './expansion-steps.component.html',
  styleUrls: ['./expansion-steps.component.scss'],
})
export class ExpansionStepsComponent {
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}

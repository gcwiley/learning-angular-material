import { ChangeDetectionStrategy, Component, model } from '@angular/core';

// angular material
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatDatepickerModule],
})
export class Calendar {
  selected = model<Date | null>(null);
}

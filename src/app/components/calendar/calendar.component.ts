import { ChangeDetectionStrategy, Component, model } from '@angular/core';

// angular material
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  standalone: true,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatDatepickerModule],
})
export class CalendarComponent {
  selected = model<Date | null>(null);
}

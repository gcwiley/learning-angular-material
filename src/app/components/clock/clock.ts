import { ChangeDetectionStrategy, Component, OnInit, OnDestroy,  } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subscription, interval } from 'rxjs';

// angular material
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  standalone: true,
  selector: 'app-clock',
  templateUrl: './clock.html',
  styleUrl: './clock.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, MatToolbarModule, MatChipsModule],
})
export class Clock implements OnInit, OnDestroy {
  // stores the current time as a Date object
  public currentTime: Date = new Date();
  private timeSubscription: Subscription | null = null;

  // define time zones in an array
  public timeZones = [
    { label: 'Local', offset: 'GMT-4' },
    { label: 'Zulu', offset: 'GMT' },
    { label: 'Tel Aviv', offset: 'GMT+2' },
    { label: 'Kyiv', offset: 'GMT+2' },
  ];

  // set up the clock update interval of 1 second
  public ngOnInit(): void {
    this.timeSubscription = interval(1000).subscribe(() => {
      this.currentTime = new Date();
    });
  }

  // clean up the subscription when the component is destroyed
  public ngOnDestroy(): void {
    this.timeSubscription?.unsubscribe();
  }
}

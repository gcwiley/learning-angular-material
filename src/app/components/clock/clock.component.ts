import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-clock',
  imports: [],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent {
    // stores the current time as a Date object
  public currentTime: Date = new Date();
  private timeSubscription: Subscription | null = null;

  // define time zones in an array
  public timeZones = [
    { label: 'Local', offset: 'GMT-4' },
    { label: 'Zulu', offset: 'GMT' },
     { label: 'Tel Aviv', offset: 'GMT+2' },
     { label: 'Kyiv', offset: 'GMT+2' 
    ]

  // set up the clock update interval of 1 second
  ngOnInit(): void {
    this.timeSubscription = internal(1000).subscribe(() => {
      this.currentTime = new Date();
    });
  }

  // clean up the subscription when the component is destoyed
  ngOnDestroy(): void {
    this.timeSubscription?.unsubscribe();
  }
}

  

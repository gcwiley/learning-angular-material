import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
   standalone: true,
   selector: 'app-hero-search',
   templateUrl: './hero-search.component.html',
   styleUrls: ['./hero-search.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [CommonModule],
})
export class HeroSearchComponent {}

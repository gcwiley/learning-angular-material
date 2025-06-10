import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// angular material
import { MatButtonModule } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

// import the guide items
import { HeroItems } from '../../shared/hero-items/hero-items';

// comment
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
   standalone: true,
   selector: 'app-carousel-container',
   templateUrl: './carousel-container.component.html',
   styleUrl: './carousel-container.component.scss',
   changeDetection: ChangeDetectionStrategy.OnPush,
   imports: [RouterLink, MatButtonModule, MatRipple, MatIconModule, MatCardModule, CarouselComponent],
})
export class CarouselContainerComponent {
   public heroItems!: HeroItems;
}

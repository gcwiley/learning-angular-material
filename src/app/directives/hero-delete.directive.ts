import { Directive, EventEmitter, HostListener, Output, input } from '@angular/core';
import { filter, first, switchMap } from 'rxjs';

// import angular material
import { MatSnackBar } from '@angular/material/snack-bar';

// import the hero service
import { HeroService } from '../services/hero.service';

@Directive({
  selector: '[appHeroDelete]',
})
export class HeroDeleteDirective {
  constructor() {}
}

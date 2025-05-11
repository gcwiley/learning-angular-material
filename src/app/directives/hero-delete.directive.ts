import { Directive, EventEmitter, HostListener, Output, input } from '@angular/core';
import { filter, first, switchMap } from 'rxjs';

// angular material
import { MatSnackBar } from '@angular/material/snack-bar';

// hero service
import { HeroService } from '../services/hero.service';

@Directive({
  selector: '[appHeroDelete]',
})
export class HeroDeleteDirective {
  // sets upa required input that expects a string value and provides an alias 'appHeroDelete' to used when the directive is being used.
  public id = input
  constructor() {}
}

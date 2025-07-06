import { Directive, ElementRef, HostBinding, inject } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';

@Directive({
  selector: '[appCarouselItem]',
})
export class CarouselItemDirective implements FocusableOption {
  @HostBinding('attr.role') readonly role = 'listitem';
  @HostBinding('tabindex') tabindex = '-1';

  readonly element = inject(ElementRef<HTMLElement>);

  public focus(): void {
    this.element.nativeElement.focus({ preventScroll: true });
  }
}

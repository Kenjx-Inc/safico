import { Directive, HostListener } from '@angular/core';
import { BackNavigationService } from './services/back-navigation.service';

@Directive({
  selector: '[appBackButton]'
})
export class BackNavigationDirective {

  constructor(private nav: BackNavigationService) { }

  @HostListener('click')
  onClick(): void {
    this.nav.back();
  }
}

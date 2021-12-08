import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackNavigationRoutingModule } from './back-navigation-routing.module';
import { BackNavigationDirective } from '../../back-navigation.directive';

@NgModule({
  declarations: [BackNavigationDirective],
  imports: [
    CommonModule
    , BackNavigationRoutingModule
  ], exports: [
    BackNavigationDirective
  ]
})

export class BackNavigationModule { }

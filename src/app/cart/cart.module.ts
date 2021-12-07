import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { BackNavigationModule } from '../shared/back-navigation/back-navigation.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BackNavigationModule,
    CartPageRoutingModule
  ],
  declarations: [CartPage]
})
export class CartPageModule { }

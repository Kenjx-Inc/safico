import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { TrackOrdersPageRoutingModule } from './track-orders-routing.module';

import { TrackOrdersPage } from './track-orders.page';
import { BackNavigationModule} from '../shared/back-navigation/back-navigation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    IonicModule,
    BackNavigationModule,
    TrackOrdersPageRoutingModule
  ],
  declarations: [TrackOrdersPage]
})
export class TrackOrdersPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ItemsPageRoutingModule } from './items-routing.module';
import { ItemsPage } from './items.page';
import { BackNavigationModule } from '../shared/back-navigation/back-navigation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BackNavigationModule,
    ItemsPageRoutingModule
  ],
  declarations: [ItemsPage]
})
export class ItemsPageModule { }

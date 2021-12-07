import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleItemPageRoutingModule } from './single-item-routing.module';

import { SingleItemPage } from './single-item.page';
import { BackNavigationModule} from '../shared/back-navigation/back-navigation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BackNavigationModule,
    SingleItemPageRoutingModule
  ],
  declarations: [SingleItemPage]
})
export class SingleItemPageModule {}

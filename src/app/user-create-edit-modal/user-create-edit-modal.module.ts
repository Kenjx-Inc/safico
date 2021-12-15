import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserCreateEditModalPageRoutingModule } from './user-create-edit-modal-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserCreateEditModalPageRoutingModule
  ],
  declarations: []
})
export class UserCreateEditModalPageModule {}

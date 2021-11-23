import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserCreateEditModalPageRoutingModule } from './user-create-edit-modal-routing.module';

import { UserCreateEditModalPage } from './user-create-edit-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserCreateEditModalPageRoutingModule
  ],
  declarations: [UserCreateEditModalPage]
})
export class UserCreateEditModalPageModule {}

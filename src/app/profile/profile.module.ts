import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ImageUploadPage } from '../image-upload/image-upload.page';

import { BackNavigationModule } from '../back-navigation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BackNavigationModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage, ImageUploadPage]
})
export class ProfilePageModule { }

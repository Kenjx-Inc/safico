import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCreateEditModalPage } from './user-create-edit-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UserCreateEditModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserCreateEditModalPageRoutingModule {}

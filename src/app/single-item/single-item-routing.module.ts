import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleItemPage } from './single-item.page';

const routes: Routes = [
  {
    path: '',
    component: SingleItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleItemPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackOrdersPage } from './track-orders.page';

const routes: Routes = [
  {
    path: '',
    component: TrackOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackOrdersPageRoutingModule {}

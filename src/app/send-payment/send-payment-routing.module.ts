import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendPaymentPage } from './send-payment.page';

const routes: Routes = [
  {
    path: '',
    component: SendPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendPaymentPageRoutingModule {}

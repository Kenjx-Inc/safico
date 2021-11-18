import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendPaymentPageRoutingModule } from './send-payment-routing.module';

import { SendPaymentPage } from './send-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendPaymentPageRoutingModule
  ],
  declarations: [SendPaymentPage]
})
export class SendPaymentPageModule {}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { DataService } from '../services/data.service';
import { MobileMoneyApiService } from '../services/mobile-money-api.service';

@Component({
  selector: 'app-send-payment',
  templateUrl: './send-payment.page.html',
  styleUrls: ['./send-payment.page.scss'],
})
export class SendPaymentPage implements OnInit {
  codeForMTNMobileMoney: any;
  codeForAirtelMobileMoney: any;
  orderTotal: number;
  cartOrder: any;
  orderPaymentSent: boolean;

  constructor(private dataService: DataService,
    private call: CallNumber,
    private mobileMoneyAPI: MobileMoneyApiService,
    private router: Router) { }

  ngOnInit() {
    this.dataService.getCartOrder()
      .subscribe((res) => {
        this.cartOrder = res.map((order) => {
          return order.payload.doc.data()
        });
        console.log(this.cartOrder[0]);
        this.orderTotal = this.cartOrder[0].total;
      })
  }


  initiatePaymentViaAitel() {
    // // Call to Airtel Payment   
       this.mobileMoneyAPI.makePaymentViaAitel().subscribe( (res)=>{
           console.log(res);
           console.log("RES", res);
       })
       
      }

      initiatePaymentMTN() {
        // // Call to Airtel Payment   
           this.mobileMoneyAPI.makePaymentViaMTN().subscribe( (res)=>{
               console.log(res);
               console.log("RES", res);
           })
           
          }
}



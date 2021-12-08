import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { NavController, ToastController } from '@ionic/angular';
import { enterAnimation } from '../nav-animation';
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
  userID: any;
  orderPaymentSent: boolean;

  constructor(private dataService: DataService,
    private call: CallNumber,
    private navCtrl: NavController,
    private mobileMoneyAPI: MobileMoneyApiService,
    private router: Router,
    private toastController: ToastController) {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    this.userID = userInfo.uid;

  }

  ngOnInit() {
    // Obtain the total price
    this.dataService.getCartOrder(this.userID)
      .subscribe((res) => {
        this.orderTotal = res.payload.get('total');
      });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your order is being processed...',
      duration: 2000
    });
    toast.present();

    toast.onWillDismiss().then(() => {
      this.navCtrl.setDirection('forward', true, 'forward', enterAnimation);
      this.router.navigate(['/track-orders']);
    });

  }

  initiatePaymentViaAitel() {
    // // Call to Airtel Payment
    // this.mobileMoneyAPI.makePaymentViaAitel().subscribe((res) => {
    //   console.log(res);
    //   // console.log("RES", res);
    // });
    this.presentToast();
  }

  initiatePaymentViaMTN() {
    // // Call to Airtel Payment
    // this.mobileMoneyAPI.makePaymentViaMTN().subscribe( (res)=>{
    //      console.log(res);
    //      console.log("RES", res);
    //  })
    this.presentToast();
  }
}



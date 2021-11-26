import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.page.html',
  styleUrls: ['./single-item.page.scss'],
})
export class SingleItemPage implements OnInit {
  data: any;
  item: any;
  isLoaded = false;
  value: number;
  newPrice;
  userID: string;


  constructor(private dataService: DataService,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    private authService: AuthService) {

    this.getUserID();
  }

  ngOnInit() {
    this.route.data.subscribe((value) => {
      this.item = { ...value.itemDetails };
    });
    this.value = 1;
    this.newPrice = this.item.price;
  }

  subtractQuantity($event) {
    //Check the value to be over 1
    if ($event > 1) {
      this.value = $event;
      this.value -= 1;
      this.setNewPrice(this.value);
      return this.value;
    }
  }

  addQuantity($event) {
    this.value = $event;
    this.value += 1;
    this.setNewPrice(this.value);
    return this.value;
  }


  setNewPrice(value) {
    const priceCost = this.item.price;    // set the unit price
    this.newPrice = priceCost * value;
  }

  orderNow(id) {
    const price = this.newPrice;
    const quantity = this.value;
    const onCart = true;
    const cartItemOrder = { ...this.item, price, onCart, quantity };
    this.dataService.addToCart(this.userID, id, cartItemOrder);

  }

  // Obtain the userID of the auth user
  getUserID() {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      this.userID = userData.uid;
      console.log(this.userID);
      return this.userID;
    }
    else {
      window.alert('Not authenticated!');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { DataService, ITEM } from '../services/data.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})

export class CartPage implements OnInit {
  cartItems: any[];
  userID: any;
  subTotal: number;
  grandTotal: number;
  distance: number;
  distanceCost: number;
  distancePerCost = 2000;  // Cost in UGX

  constructor(private dataService: DataService) {
    // Obtain the user id from storage
    const { uid } = JSON.parse(localStorage.getItem('user'));
    this.userID = uid;
    this.dataService.getCartItems(this.userID)
      .subscribe((res) => {
        this.cartItems = res.map((item) => ({
          id: item.payload.doc.id,
          ...item.payload.doc.data() as ITEM
        }));

        this.getSubTotal();
        this.getTotal();
      });
  }

  ngOnInit() {
    this.grandTotal = 0;
    this.subTotal = 0;
    this.distanceCost = 25000;
  }

  //  Remove cart item
  removeCartItem(id: string) {
    this.dataService.deleteCartItem(this.userID, id);
    this.getTotal();
  }

  // Get subtotal from cart items alone
  getSubTotal() {
    // Obtain the cart list
    this.subTotal = this.cartItems.reduce((prev, curr) => prev + curr.price, 0);
  }

  // Obtain the total of the order...
  getTotal() {
    // Obtain distance by Google(Metric- KILOMETERS)
    this.distance = 4;

    // Compute total cost of distance
    this.distanceCost = this.distance * this.distancePerCost;

    // Obtain the grandTotal
    this.grandTotal = this.subTotal + this.distanceCost;
  }

  placeOrder() {
    const total = this.grandTotal;
    const distance = this.distance;
    const userID = this.userID;
    this.dataService.addToCartOrder({ ...this.cartItems, total, distance}, userID);
  }

}

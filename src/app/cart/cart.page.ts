import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { DataService, ITEM } from '../services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})

export class CartPage implements OnInit {
  cartItems: any[];
  subTotal: number;
  grandTotal: number;
  distance: number;
  distanceCost: number;
  DISTANCE_PER_COST: number = 2000;  // Cost in UGX

  constructor(private dataService: DataService) {
    this.dataService.getCartItems().subscribe((res) => {
      this.cartItems = res.map((item) => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as ITEM
        }
      });
      this.getSubTotal();
      this.getTotal();
    })
  }
  
  ngOnInit() {
    this.grandTotal = 0;
    this.subTotal = 0;
    this.distanceCost = 25000;
 }

   //  Remove cart item
  removeCartItem(id: string) {
    this.dataService.deleteCartItem(id);
    this.getTotal();
  }
 
  // Get subtotal from cart items alone
  getSubTotal() {
    // Obtain the cart list
    this.subTotal = this.cartItems.reduce((prev, curr)=> { 
      return prev + curr.price ;
     },0);
  }

  // Obtain the total of the order...
  getTotal() {
    // Obtain distance by Google(Metric- KILOMETERS)
    this.distance = 4;

    // Compute total cost of distance    
   this.distanceCost = this.distance * this.DISTANCE_PER_COST;

    // Obtain the grandTotal
    this.grandTotal = this.subTotal + this.distanceCost;
  }

  placeOrder(){
    
  }

}

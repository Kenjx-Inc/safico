import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService} from '../services/data.service';
import { LoadingController } from '@ionic/angular';


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
  newPrice: number;

  constructor(private dataService: DataService,
    private route: ActivatedRoute, private router: Router,
    public loadingController: LoadingController) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.route.snapshot.data['itemDetail']) {
      this.item = this.route.snapshot.data.itemDetail;
      this.value = 1;
      this.newPrice = this.item.price;
    }
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
    let priceCost = this.item.price;    // set the unit price    
    this.newPrice = priceCost * value;
  }

  orderNow(id) {
    let price = this.newPrice
    let quantity = this.value;
    let onCart = true;
    let cartItemOrder = { ...this.item, price, onCart, quantity };
    this.dataService.addToCart(id, cartItemOrder);

  }

}

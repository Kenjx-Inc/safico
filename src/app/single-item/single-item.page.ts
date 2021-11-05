import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.page.html',
  styleUrls: ['./single-item.page.scss'],
})
export class SingleItemPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  subtractQuantity() {
    // Min return value is 1
    console.log('Subtract....');
  }
  
  addQuantity() {
    console.log('Add Quantity...');
  }

}

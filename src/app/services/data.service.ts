import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export class ITEM {
  id: string;
  name: string;
  description: string;
  img: string;
  currency: string;
  favourite: boolean;
  onCart: boolean;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(
    private ngFirestore: AngularFirestore,
    private router: Router
  ) { }

  getItems() {
    return this.ngFirestore.collection('items').snapshotChanges();
  }

  getItem(id: string): Observable<any> {
    return this.ngFirestore.collection('items').doc(id).valueChanges({ idField: 'id' });
  }

  // Cart Items actions
  //  Delete cart items
  deleteCartItem(id: string) {
    this.ngFirestore.collection('cart').doc(id).delete().then(
      (res) => {
        alert("Deleted item ");  
      }
    ).catch( (err)=> alert("Error deleting the item"));
  }

  //  Fetch cart items
  getCartItems() {
    return this.ngFirestore.collection('cart').snapshotChanges();
  }

  addToCart(id, item) {
    this.ngFirestore.collection('cart').doc(id).set(
      { ...item });
  }

}

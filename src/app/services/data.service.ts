import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


export interface FILE {
  name: string;
  filepath: string;
  size: number;
}

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
    private ngFirestore: AngularFirestore
  ) { }

  getItems() {
    return this.ngFirestore.collection('items').snapshotChanges();
  }

  getItem(id: string): Observable<any> {
    return this.ngFirestore.collection('items').doc(id).valueChanges({ idField: 'id' });
  }

  // Cart Items actions
  deleteCartItem(id: string) {
    this.ngFirestore.collection('cart').doc(id).delete().then(
      (res) => {
        alert('Deleted item ');
      }
    ).catch((err) => alert('Error deleting the item'));
  }

  //  Fetch cart items
  getCartItems() {
    return this.ngFirestore.collection('cart').snapshotChanges();
  }

  addToCart(id, item) {
    this.ngFirestore.collection('cart').doc(id).set(
      { ...item });
  }

  // Add to cart-order
  addToCartOrder(item) {
    this.ngFirestore.collection('cart-order').add(item);
  }

  // Fetch Card Order price
  getCartOrder() {
    return this.ngFirestore.collection('cart-order').snapshotChanges();
  }

}

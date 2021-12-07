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
  category: string;
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

  // Cart Item Actions
  //  Fetch cart items for a user
  getCartItems(userId) {
    return this.ngFirestore.collection('cart').doc(userId).collection('items').snapshotChanges();
  }

  // Add specific items for spefic user
  addToCart(userId, id, item) {
    this.ngFirestore.collection('cart').doc(userId).collection('items').doc(id).set(
      { ...item });
  }

  // Delete a specific cart item
  deleteCartItem(userId, id) {
    this.ngFirestore.collection('cart').doc(userId).collection('items').doc(id).delete();
  }

  // Add to cart-order by specific user
  addToCartOrder(item, userId) {
    this.ngFirestore.collection('cart-order').doc(userId).set(item);
  }

  // Fetch Card Order
  getCartOrder(userId) {
    return this.ngFirestore.collection('cart-order').doc(userId).snapshotChanges();
  }

  // Delete existing cart items
  clearCart(userId) {
    const ref = this.ngFirestore.collection('cart').doc(userId).collection('items').ref;
    const ref2Collection = this.ngFirestore.collection('cart').doc(userId);

    // first delete single items...
    this.getCartItems(userId)
      .subscribe((res) => {
        res.forEach((item) => {
          ref.doc(item.payload.doc.id).delete();
        });
      });

    ref2Collection.delete();
  }

  // Delete existing cart order
  clearCartOrder(userId) {
    this.ngFirestore.collection('cart-order').doc(userId).delete();
  }

}

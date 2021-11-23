import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';


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
  ngFireUploadTask: AngularFireUploadTask;
  IMAGE_URL_FROM_FIREBASE: Observable<string>;
  files: Observable<FILE[]>;
  FileName: string;
  FileSize: number;
  isImgUploading: boolean;
  isImgUploaded: boolean;
  ngFirestoreCollection: AngularFirestoreCollection<FILE>;
  progressSnapshot: any;

  constructor(
    private ngFirestore: AngularFirestore,
    private ngFireStorage: AngularFireStorage

  ) {
    this.isImgUploading = false;
    this.isImgUploaded = false;

    this.ngFirestoreCollection = ngFirestore.collection<FILE>('profile');
    this.files = this.ngFirestoreCollection.valueChanges();

  }

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
        alert("Deleted item ");
      }
    ).catch((err) => alert("Error deleting the item"));
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
    ;
    this.ngFirestore.collection('cart-order').add(item);
  }

  // Fetch Card Order price
  getCartOrder() {
    return this.ngFirestore.collection('cart-order').snapshotChanges();
  }

  // add user info
  addUser(newUser) {
    this.ngFirestore.collection('user').add(newUser);
  }

  // get user info based on the id
  getUser(userId) {
    return this.ngFirestore.collection('user').doc(userId).snapshotChanges();
  }

  // File Upload
  fileUpload(event: FileList) {
    const file = event.item(0);

    this.isImgUploading = true;
    this.isImgUploaded = false;

    this.FileName = file.name;
    const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;
    const imageRef = this.ngFireStorage.ref(fileStoragePath);

    this.ngFireUploadTask = this.ngFireStorage.upload(fileStoragePath, file);

    this.progressSnapshot = this.ngFireUploadTask.snapshotChanges().pipe( 

    finalize(() => {
      this.IMAGE_URL_FROM_FIREBASE = imageRef.getDownloadURL();

      this.IMAGE_URL_FROM_FIREBASE.subscribe(resp => {
        this.fileStorage({
          name: file.name,
          filepath: resp,
          size: this.FileSize
        });
        this.isImgUploading = false;
        this.isImgUploaded = true;

      }, error => {
        console.log(error);
      })
    }),
      tap(snap => {
        this.FileSize = snap.totalBytes;
      })
    )
  }


  fileStorage(image: FILE) {
    const imgId = this.ngFirestore.createId();

    this.ngFirestoreCollection.doc(imgId).set(image).then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
  }
}

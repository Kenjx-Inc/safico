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
  IMAGE_URL_FROM_FIREBASE_PATH: Observable<string>;
  IMAGE_URL_FROM_FIREBASE_STORAGE: any;
  files: Observable<FILE[]>;
  FileName: string;
  FileSize: number;
  isImgUploading: boolean;
  isImgUploaded: boolean;
  ngFirestoreCollection: AngularFirestoreCollection<FILE>;
  progressSnapshot: any;
  currentImageUrl: string; // to store the downloadUrl of image to be displayed
  selectedFiles: Array<File>; // to store selected files in the File Explorer


  constructor(
    private ngFirestore: AngularFirestore,
    private ngFireStorage: AngularFireStorage

  ) {
    // this.isImgUploading = false;
    // this.isImgUploaded = false;

    // this.ngFirestoreCollection = ngFirestore.collection<FILE>('profile');
    // this.files = this.ngFirestoreCollection.valueChanges();
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
    this.ngFirestore.collection('cart-order').add(item);
  }

  // Fetch Card Order price
  getCartOrder() {
    return this.ngFirestore.collection('cart-order').snapshotChanges();
  }
  // File Upload
  // async fileUpload(event: FileList) {
  //   const file = event.item(0);

  //   this.isImgUploading = true;
  //   this.isImgUploaded = false;

  //   this.FileName = file.name;
  //   const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;
  //   const imageRef = this.ngFireStorage.ref(fileStoragePath);

  //   this.ngFireUploadTask = this.ngFireStorage.upload(fileStoragePath, file);

  //   this.ngFireUploadTask.snapshotChanges().pipe(
  //     finalize(() => {
  //       this.IMAGE_URL_FROM_FIREBASE_PATH = imageRef.getDownloadURL();
  //       this.IMAGE_URL_FROM_FIREBASE_PATH.subscribe(resp => {

  //         this.fileStorage({
  //           name: file.name,
  //           filepath: resp,
  //           size: this.FileSize
  //         });
  //         this.isImgUploading = false;
  //         this.isImgUploaded = true;

  //       }, error => {
  //         console.log(error);
  //       })
  //     }),
  //     tap(snap => {
  //       this.FileSize = snap.totalBytes;
  //     })
  //   )

  //   this.IMAGE_URL_FROM_FIREBASE_STORAGE = await this.ngFireStorage.ref(file.name).getDownloadURL().toPromise();
  //   console.log("IMG>>2", this.IMAGE_URL_FROM_FIREBASE_STORAGE);

  // }


  // fileStorage(image: FILE) {
  //   const imgId = this.ngFirestore.createId();

  //   this.ngFirestoreCollection.doc(imgId).set(image).then(data => {
  //     console.log(data);
  //   }).catch(error => {
  //     console.log(error);
  //   });
  // }


  async fileUpload(user) {
  this.IMAGE_URL_FROM_FIREBASE_STORAGE = await this.ngFireStorage.ref(user.userPhoto)
    .getDownloadURL()
    .toPromise();
  }

  
  async uploadImage(uid, file): Promise < string > {
    const fileRef = this.ngFireStorage.ref(uid).child(file.name);

    // Upload file in reference
    if (!!file) {
      const result = await fileRef.put(file);

      return result.ref.fullPath;
    }
  }
}
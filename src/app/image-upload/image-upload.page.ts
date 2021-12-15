import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';

export interface FILE {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.page.html',
  styleUrls: ['./image-upload.page.scss'],
})
export class ImageUploadPage implements OnInit {

  ngFireUploadTask: AngularFireUploadTask;
  progressNum: Observable<number>;
  progressSnapshot: Observable<any>;
  fileUploadedPath: Observable<string>;
  files: Observable<FILE[]>;
  fileName: string;
  fileSize: number;
  isImgUploading: boolean;
  isImgUploaded: boolean;
  filePath: string;
  fileId: string;
  imgIdFromFirestore: string;
  userID: string;

  private ngFirestoreCollection: AngularFirestoreCollection<FILE>;


  constructor(private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
    private modalController: ModalController
  ) {
    this.isImgUploading = false;
    this.isImgUploaded = false;
    const user = JSON.parse(localStorage.getItem('user'));
     this.userID = user.uid;
    this.ngFirestoreCollection = angularFirestore.collection<FILE>('filesCollection');
    this.files = this.ngFirestoreCollection.valueChanges();

  }

  ngOnInit() {
  }

  // Change image of the user
  fileUpload(event) {
    const file = event.target.files[0].item(0);

    if (file.type.split('/')[0] !== 'image') {
      console.log('File type not supported!');
      return;
    }

    this.isImgUploading = true;
    this.isImgUploaded = false;
    this.fileName = file.name;

    const fileStoragePath = `filesStorage/user/${this.userID}/${new Date().getTime()}_${file.name}`;
    const imageRef = this.angularFireStorage.ref(fileStoragePath);
    this.ngFireUploadTask = this.angularFireStorage.upload(fileStoragePath, file);

    this.progressNum = this.ngFireUploadTask.percentageChanges();
    this.progressSnapshot = this.ngFireUploadTask.snapshotChanges().pipe(

      finalize(() => {
        this.fileUploadedPath = imageRef.getDownloadURL();

        this.fileUploadedPath.subscribe(resp => {
          this.fileStorage({
            name: file.name,
            filepath: resp,
            size: this.fileSize
          });
          this.isImgUploading = false;
          this.isImgUploaded = true;

        }, error => {
          console.log(error);
        });
      }),
      tap(snap => {
        this.fileSize = snap.totalBytes;
      })
    );
  }


  fileStorage(image: FILE) {
    const imgId = this.angularFirestore.createId();
    this.fileId = imgId;
    this.filePath = image.filepath;

    this.ngFirestoreCollection.doc(imgId).set(image).catch(error => {
      console.log(error);
    });;
  }

  // Close modal
  async closeUploadModal() {
    await this.modalController.dismiss(this.filePath);
  }
}

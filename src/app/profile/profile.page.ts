import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';
import { ImageUploadPage } from '../image-upload/image-upload.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit, AfterViewInit {
  coords: any;
  lat: any;
  lng: any;
  address: any;
  options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  filePathFireStore: string;
  filePathDefault = '../../assets/profile/profile1.PNG';
  fileId: any;
  firstName: string;
  lastName: string;
  userEmail: string;

  constructor(private geolocation: Geolocation,
    public authService: AuthService,
    private nativeGeocoder: NativeGeocoder,
    public modalController: ModalController) {

    // Get user credentials...
    const user = JSON.parse(localStorage.getItem('user'));
    this.filePathFireStore = user.providerData[0].photoURL !== null ? user.photoURL : this.filePathDefault;
    this.firstName = user.displayName.split(' ')[0];
    this.lastName = user.displayName.split(' ')[1];
    this.userEmail = user.email;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.locate();
  }

  //  Obtain location of the device
  locate() {
    this.geolocation.getCurrentPosition().then(
      (data) => {
        this.lat = data.coords.latitude;
        this.lng = data.coords.longitude;
        this.geoCode(this.lat, this.lng);
      }).catch((error) => {
        alert('Your location has not yet been determined!');
      });
  }

  //  Reverse geocode to obtain address
  geoCode(lat, lng) {
    this.nativeGeocoder.reverseGeocode(lat, lng, this.options)
      .then((res: NativeGeocoderResult[]) => {
        // Obtain the first result
        this.address = this.createAddress(res[0]);
      })
      .catch((error: any) => console.log(error));
  }

  // Create address
  createAddress(addressObject) {
    const object = [];

    // TODO -  LOOK FOR EMPTY STRING KEYS
    // eslint-disable-next-line guard-for-in
    for (const key in addressObject) {
      object.push(addressObject[key]);
    }
    object.reverse();

    for (const value in object) {
      if (object[value].length) { this.address += object[value] + ', '; }
    }
    return this.address.slice(0, -2);
  }


  async presentUploadModal() {
    const modal = await this.modalController.create({
      component: ImageUploadPage,
      cssClass: 'user-modal',
      presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
    });

    modal.onDidDismiss().then((data) => {
      this.filePathFireStore = data.data;

      // Save to user credentials...
      this.authService.addImageToUser(this.filePathFireStore);
    });

    return await modal.present();
  }

}

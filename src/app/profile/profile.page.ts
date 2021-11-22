import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { AuthService } from '../services/auth.service';

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

  constructor(private geolocation: Geolocation, 
    private authService: AuthService ,private nativeGeocoder: NativeGeocoder) {
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

}

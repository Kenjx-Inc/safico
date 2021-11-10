import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AlertController } from '@ionic/angular';

declare const google;

@Component({
  selector: 'app-track-orders',
  templateUrl: './track-orders.page.html',
  styleUrls: ['./track-orders.page.scss'],
})

export class TrackOrdersPage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('start') startElement: ElementRef;
  @ViewChild('end') endElement: ElementRef;
  coords: any;
  map: any;

  // Set time
  startDate: any = new Date().toISOString();
  deliveryTime: any;
  deliveryLocation: any;

  constructor(public navCtrl: NavController,
    public alertController: AlertController,
    private call: CallNumber, private geolocation: Geolocation, private plt: Platform) {

    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    this.plt.ready().then(() => {
      const mapOptions: any = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.geolocation.getCurrentPosition().then(pos => {
        const latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.map.setCenter(latLng);
        this.map.setZoom(18);

        // Marker
        const marker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: 'Current Location'
        });

        // Delivery Place
        this.deliveryLocation = 'Mukono Plaza';
        this.deliveryTime = '12:45 PM';

        const content = '<p>This is your current position </p>';
        const infoWindow = new google.maps.InfoWindow({
          content
        });

        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(this.map, marker);
        });

      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });

    /**Display route
    Direction Service not yet fully implemented for need of subscription to service
    */

    directionsRenderer.setMap(this.map);

    // SET DELIVERY TIME - TODO
    this.calculateAndDisplayRoute(directionsService, directionsRenderer);

  }

  ngOnInit() { }

  calculateAndDisplayRoute(directionsService: google.maps.DirectionsService,
    directionsRenderer: google.maps.DirectionsRenderer) {
    // Test areas to see implementation
    directionsService.route({
      origin: {
        query: 'C6X3+42X, Jinja',
      },
      destination: {
        query: '8HX7+W5 Kampala',
      },
      travelMode: google.maps.TravelMode.DRIVING,
    }).then((response) => {
      directionsRenderer.setDirections(response);
    })
      .catch((e) => window.alert('Directions request failed due to ' + status));

  }

  // Call to driver
  async callDriver(): Promise<any> {
    try {
      await this.call.callNumber('+256771865931', true);
    }
    catch (e) {
      console.error(e);
    }
  }

  // Confirm order recieved
  isOrderRecieved() {

    // Present alert
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Order',
      message: 'Confirm order recieved please.',
      cssClass: 'custom-alert-wrapper',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'alert-style-two'
        }, {
          text: 'Confirm',
          cssClass: 'alert-style-one',
          handler: () => {
            console.log('Confirm Okay');
          }
        }]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('Cancelled order alert ', role);
  }

}

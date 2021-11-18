import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouteReuseStrategy, RouterStateSnapshot } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

//  Firebase modules
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

// Environment
import { environment } from '../environments/environment';
import { DataResolverService } from './services/data-resolver.service';
import { DataService } from './services/data.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    IonicModule.forRoot(),
    AppRoutingModule],
  providers: [NativeGeocoder,
    Geolocation,
    CallNumber,
    DataResolverService,
    DataService,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

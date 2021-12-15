import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

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
import { HttpClientModule } from '@angular/common/http';
import { MobileMoneyApiService } from './services/mobile-money-api.service';
import { AuthGuardService } from './services/auth-guard.service';
import { BackNavigationService } from './services/back-navigation.service';
import { BackNavigationModule } from './back-navigation.module';

import { enterAnimation } from './nav-animation';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BackNavigationModule,
    IonicModule.forRoot({
      navAnimation: enterAnimation // Add your animations!
    }),
    AppRoutingModule],
  providers: [NativeGeocoder,
    Geolocation,
    CallNumber,
    DataResolverService,
    DataService,
    AuthGuardService,
    MobileMoneyApiService,
    BackNavigationService,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

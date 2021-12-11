import { Component, OnInit, ViewChild, AfterContentChecked, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, LoadingController, NavController } from '@ionic/angular';
import { enterAnimation } from '../nav-animation';
import { DataService, ITEM } from '../services/data.service';

import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomePage implements OnInit, AfterContentChecked {

  @ViewChild('swiper') swiper: SwiperComponent;

  isLoaded = false;
  itemsFoundList: any;
  itemsRecommended: any;
  items: any;
  loading: HTMLIonLoadingElement;
  isItemAvailable = false;

  // user image profile
  imagePathURL: string;
  filePathDefault = '../../assets/profile/profile1.PNG';

  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    breakpoints: {
      // when window width is >= 320px
    320: {
      slidesPerView: 1.5,
      spaceBetween: 10
    },
    // when window width is >= 480px
    573: {
      slidesPerView: 2.5,
      spaceBetween: 5
    },
    // when window width is >= 640px
    900: {
      slidesPerView: 3.5,
      spaceBetween: 5
    }
    }
  };

  constructor(private dataService: DataService, private router: Router,
    private navCtrl: NavController, private loadingCtrl: LoadingController) {
    this.loadingNow();
  }


  ngOnInit() {
    this.dataService.getItems().subscribe((res) => {
      this.items = res.map((item) => ({
        id: item.payload.doc.id,
        ...item.payload.doc.data() as ITEM
      }));

      this.itemsRecommended = this.items.filter((_item) => {
        if (_item.category === 'Drink' || _item.category === 'Lunch/Supper' || _item.category === 'Fast Food') {
          this.isLoaded = !this.isLoaded;
          return _item;
        }
      });
    });
  }
  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  // Navigate to single item
  navigateToItem(id) {
    this.loadingNow();
    this.router.navigateByUrl(`/item/${id}`, { skipLocationChange: true });
  }

  navigateToProfile() {
    this.navCtrl.setDirection('forward', true, 'forward', enterAnimation);
    this.router.navigateByUrl('/tabnav/profile');
  }

  // Implement search on home

  getItemsBySearch(event: any) {
    // set val to the value of the searchbar
    const value = event.target.value;

    // if the value is an empty string don't filter the items
    if (value && value.trim() !== '') {
      this.isItemAvailable = true;
      this.itemsFoundList = this.items.filter((item) => {
        if (item.name.toLowerCase().includes(value.toLowerCase())) { return item.name; }
      });
    } else {
      this.isItemAvailable = false;
    }
  }

  loadingNow() {
    this.loadingCtrl.create({
      message: 'Please wait...',
      translucent: true,
      backdropDismiss: true,
      duration: 4000
    }).then((overlay) => {
      this.loading = overlay;
      const user = JSON.parse(localStorage.getItem('user'));
      this.imagePathURL = user.providerData[0].photoURL !== null ? user.photoURL : this.filePathDefault;
      this.loading.present();
    });
  }
}

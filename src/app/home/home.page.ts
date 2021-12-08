import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, LoadingController, NavController } from '@ionic/angular';
import { enterAnimation } from '../nav-animation';
import { DataService, ITEM } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  @ViewChild('slides', { static: false }) slider: IonSlides;

  selectedSlide: any;
  segment = 0;
  isLoaded = false;
  itemsFoundList: any;
  itemsRecommended: any;
  items: any;
  loading: HTMLIonLoadingElement;
  isItemAvailable = false;

  // user image profile
  imagePathURL: string;
  filePathDefault = '../../assets/profile/profile1.PNG';


  options = {
    slidesPerView: 1.5,
    spaceBetweenView: 10
  };

  slidesOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 1
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

  async segmentChanged(event) {
    await this.selectedSlide.slideTo(this.segment);
  }

  async slidesChanged(slides: IonSlides) {
    this.selectedSlide = slides;
    slides.getActiveIndex().then(selectedIndex =>
      this.segment = selectedIndex);
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

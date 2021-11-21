import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { DataService, ITEM } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  selectedSlide: any;
  segment = 0;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('slides', { static: false }) slider: IonSlides;
  options = {
    slidesPerView: 1.5,
    spaceBetweenView: 10
  };

  slidesOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 1
  };

  itemsRecommended: any;
  items: any;

  constructor(private dataService: DataService, private router: Router) {
    }

  ngOnInit() {
    this.dataService.getItems().subscribe((res) => {
      this.items = res.map((item) => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as ITEM
        }
      });

      this.itemsRecommended = this.items.filter((_item) => {
        if (_item.category === "Drink" || _item.category === "Lunch/Supper" || _item.category === "Fast Food") {
          return _item;
        }
      });
    })
  }

  async segmentChanged(event) {
    console.log(this.segment);
    await this.selectedSlide.slideTo(this.segment);
  }

  async slidesChanged(slides: IonSlides) {
    this.selectedSlide = slides;
    slides.getActiveIndex().then(selectedIndex =>
      this.segment = selectedIndex);
  }

  // Navigate to single item
  navigateToItem(id){
    this.router.navigateByUrl(`/items/${id}`,{ skipLocationChange: true});
  }

}

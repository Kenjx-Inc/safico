import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

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


  constructor() { }

  ngOnInit() { }

  async segmentChanged(event) {
    console.log(this.segment);
    await this.selectedSlide.slideTo(this.segment);
  }

  async slidesChanged(slides: IonSlides) {
    this.selectedSlide = slides;
    slides.getActiveIndex().then(selectedIndex =>
      this.segment = selectedIndex);
  }

}

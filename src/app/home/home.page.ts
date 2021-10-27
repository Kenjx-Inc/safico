import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  options = {
    slidesPerView: 1.5,
    centered: true,
    spaceBetweenView: 10,
    autoHeight: true
  };

  slidesOptions = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400
  };

  constructor() { }

  ngOnInit() { }

}

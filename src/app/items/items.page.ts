import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DataService, ITEM } from '../services/data.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})

export class ItemsPage implements OnInit {
  items: ITEM[];
  private loading: any;
  constructor(private dataService: DataService, private router: Router,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.dataService.getItems().subscribe((res) => {
      this.items = res.map((item) => ({
          id: item.payload.doc.id,
          ...item.payload.doc.data() as ITEM
        }));
    });
  }


  openItemDetails(id) {
    this.loadingCtrl.create( {
      message: 'Please wait...',
      translucent:true,
      backdropDismiss: true,
      duration: 4000
    }).then( (overlay)=>{
      this.loading = overlay;
      this.loading.present();
    });

    this.router.navigateByUrl(`/item/${id}`,{ skipLocationChange: true});
  }
}

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
  private loading: any;
  items: ITEM[];
  constructor(private dataService: DataService, private router: Router,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.dataService.getItems().subscribe((res) => {
      this.items = res.map((item) => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as ITEM
        }
      });
    })
  }

  // Populate data items
  itemsList() {
    this.dataService.getItems().subscribe();
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
    })
    
    this.router.navigateByUrl(`/items/${id}`,{ skipLocationChange: true});
  }
}

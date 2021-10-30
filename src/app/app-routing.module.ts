import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabnav/tabnav.module').then(m => m.TabnavPageModule)
  },
  {
    path: 'track-orders',
    loadChildren: () => import('./track-orders/track-orders.module').then( m => m.TrackOrdersPageModule)
  },
  {
    path: 'single-item',
    loadChildren: () => import('./single-item/single-item.module').then( m => m.SingleItemPageModule)
  }
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

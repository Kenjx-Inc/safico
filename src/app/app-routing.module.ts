import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomPreloadingStrategyService } from './services/custom-preloading-strategy.service';
import { DataResolverService } from './services/data-resolver.service';

const routes: Routes = [
  {
    path: 'tabnav',
    loadChildren: () => import('./tabnav/tabnav.module').then(m => m.TabnavPageModule)
  },
  {
    path: 'track-orders',
    loadChildren: () => import('./track-orders/track-orders.module').then( m => m.TrackOrdersPageModule)
  },
  {
    path: 'item/:id',
    resolve: {
      itemDetails: DataResolverService
    },
    loadChildren: () => import('./single-item/single-item.module').then( m => m.SingleItemPageModule)
  },
  {
    path: 'items',
    loadChildren: () => import('./items/items.module').then( m => m.ItemsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then( m => m.CreateAccountPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'send-payment',
    loadChildren: () => import('./send-payment/send-payment.module').then( m => m.SendPaymentPageModule)
  },
  {
    path: 'user-create-edit-modal',
    loadChildren: () => import('./user-create-edit-modal/user-create-edit-modal.module').then( m => m.UserCreateEditModalPageModule)
  },  {
    path: 'image-upload',
    loadChildren: () => import('./image-upload/image-upload.module').then( m => m.ImageUploadPageModule)
  }


];


@NgModule({
  imports: [
    // Add preloading by custom functionality
    // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategyService })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

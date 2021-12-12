import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { DataResolverService } from './services/data-resolver.service';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'tabnav',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./tabnav/tabnav.module').then(m => m.TabnavPageModule)
  },
  {
    path: 'track-orders',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./track-orders/track-orders.module').then(m => m.TrackOrdersPageModule)
  },
  {
    path: 'item/:id',
    resolve: {
      itemDetails: DataResolverService
    },
    canActivate: [AuthGuardService],
    loadChildren: () => import('./single-item/single-item.module').then(m => m.SingleItemPageModule)
  },
  {
    path: 'items',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./items/items.module').then(m => m.ItemsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then(m => m.CreateAccountPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'user-create-edit-modal',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./user-create-edit-modal/user-create-edit-modal.module').then(m => m.UserCreateEditModalPageModule)
  },
  {
    path: 'image-upload',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./image-upload/image-upload.module').then(m => m.ImageUploadPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)
  }

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

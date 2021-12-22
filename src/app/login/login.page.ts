import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  validationMessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };
  message: string;
  validationsForm: any;


  constructor(public authService: AuthService, public router: Router,
    private navCtrl: NavController, private toastController: ToastController,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  logIn(value) {
    this.authService.logIn(value.email, value.password)
      .then(() => {
        this.message = 'Welcome to Safico! Pick your first item.';
        this.presentToast();
        this.navCtrl.navigateForward('/tabnav');
      }).catch((error) => {
        this.getCustomErrorMessage(error.message);
        this.presentToast();
      });
  }

  // Toast
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 3000
    });
    toast.present();
  }

  getCustomErrorMessage(message: string) {
    switch (message) {
      case 'auth/network-request-failed':
        this.message = 'Please check again your internet connection.';
        break;
      case 'auth/user-disabled':
        this.message = 'Please create another account or call the administrator.';
        break;
      case 'auth/user-not-found':
        this.message = 'The account below doesn\'t exist!.';
        break;
      case 'auth/user-token-expired':
      case 'auth/invalid-user-token':
        this.message = 'Please sign in again.';
        break;
      case 'auth/web-storage-unsupported':
        this.message = 'Device storage not yet supported or unavailable.';
        break;
      case 'auth/user-not-verified':
        this.message = 'This email address not verified. Check your inbox!';
        break;
      case 'auth/too-many-requests':
        this.message = 'Sorry, try again later!';
        break;
      default:
        this.message = 'Please restart the app or check your internet connection.';
    }
  }
}

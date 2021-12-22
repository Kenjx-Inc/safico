import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { enterAnimation } from '../nav-animation';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-user-create-edit-modal',
  templateUrl: './user-create-edit-modal.page.html',
  styleUrls: ['./user-create-edit-modal.page.scss'],
})

export class UserCreateEditModalPage implements OnInit {

  validationsForm: any;
  userEmail: any;
  message: any;
  email;
  password;
  currentUser: any;
  selectedFiles: any;
  currentImageUrl: any;
  storage: any;


  validationMessages = {
    firstName: [
      { type: 'required', message: 'First name is required.' },
      { type: 'pattern', message: 'Please enter a valid name.' }
    ],
    lastName: [
      { type: 'required', message: 'Last name is required.' },
      { type: 'pattern', message: 'Please enter a valid name.' }
    ]
  };


  constructor(private formBuilder: FormBuilder, private navCtrl: NavController,
    public authService: AuthService,
    public router: Router,
    private modal: ModalController,
    private alertController: AlertController) {

  }

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z].[a-zA-Z0-9]+.$')
      ])),
      lastName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z].[a-zA-Z0-9]+.$')
      ]))
    });
  }

  addMoreUserDetails(form) {
    this.authService.createUser(this.email, this.password, { ...form })
     .then(() => {
      this.message = 'Verification email sent! Check your inbox.';
      this.presentAlert();
      
    }).catch((error) => {
      this.getCustomErrorMessage(error.code);
      this.presentAlert();
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Create Account',
      message: this.message,
      cssClass: 'custom-alert-wrapper',
      buttons: [
        {
          text: 'OK',
          cssClass: 'alert-style-one',
          handler: () => {
            this.navCtrl.navigateRoot('/login');
            this.navCtrl.setDirection('forward', true, 'forward', enterAnimation);
            this.closeModal();
          }
        }]
    });

    await alert.present();
  }

  getCustomErrorMessage(code) {
    switch (code) {
      case 'auth/email-already-in-use':
        this.message = 'This email address is already in use!.';
        break;
      case 'auth/invalid-email':
        this.message = 'Invalid email!';
        break;
      default:
        this.message = 'Check your internet connection, or try again!';
    }
    this.navCtrl.setDirection('back', true, 'back', enterAnimation);
    this.navCtrl.navigateRoot('/create-account');
  }

  async closeModal() {
    await this.modal.dismiss();
  }
}

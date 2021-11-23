import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController, NavParams } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UserCreateEditModalPage } from '../user-create-edit-modal/user-create-edit-modal.page';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  validationsForm: any;
  userEmail: any;
  errorMessage: any;
  userPassword: any;

  validationMessages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  constructor(public authService: AuthService,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    private alertController: AlertController) { }

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

  createUserAccount(value) {
    // this.authService.createUser(value.email, value.password).
    //   then((res) => {
    //     // this.navCtrl.navigateForward('/login');
        this.userEmail = value.email;
        this.userPassword = value.password;
        this.presentModal();
        // this.presentAlertPrompt();
      // }).catch((error) => {
      //   this.errorMessage = error.message;
      // })
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: UserCreateEditModalPage,
      componentProps: {
         email: this.userEmail,
         password: this.userPassword
      },
      cssClass: 'user-modal',
      presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
    });
    return await modal.present();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Add more details.',
      inputs: [
        {
          name: 'first_name',
          type: 'text',
          placeholder: 'First Name'
        },
        {
          name: 'last_name',
          type: 'text',
          id: 'last-name',
          placeholder: 'Last Name'
        },
        {
          name: 'file',
          type: 'text',
          id: 'file',
          value: 'hello',
          placeholder: 'Last Name'
        },
        {
          name: 'email',
          value: this.userEmail
        },
        {
          name: 'last_name',
          type: 'text',
          id: 'last-name',
          value: 'hello',
          placeholder: 'Last Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }
}
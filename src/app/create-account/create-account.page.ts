import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController} from '@ionic/angular';
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
    private formBuilder: FormBuilder,
    public modalController: ModalController) { }

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
    this.userEmail = value.email;
    this.userPassword = value.password;
    this.presentModal();
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

  async closeModal() {
    await this.modalController.dismiss();
  }
}

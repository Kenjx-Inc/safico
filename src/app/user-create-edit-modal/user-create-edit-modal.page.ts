import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
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
  errorMessage: any;
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
    private modal: ModalController) {

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
    this.authService.createUser(this.email, this.password, { ...form }).then((res) => {
      this.modal.dismiss();
      this.navCtrl.setDirection('forward', true, 'forward', enterAnimation);
      this.navCtrl.navigateRoot('/login');
    });
  }
}

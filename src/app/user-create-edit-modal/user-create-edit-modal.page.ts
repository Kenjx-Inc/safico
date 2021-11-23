import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';


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
  validationMessages = {
    'firstName': [
      { type: 'required', message: 'First name is required.' },
      { type: 'pattern', message: 'Please enter a valid name.' }
    ],
    'lastName': [
      { type: 'required', message: 'Last name is required.' },
      { type: 'pattern', message: 'Please enter a valid name.' }
    ],
    'telephone': [
      { type: 'required', message: 'Telehone number is required.' },
      { type: 'pattern', message: 'Please enter ten digits.' }
    ],
    'profileImage': [{ type: 'required', message: 'A profile image is required.' }
    ]
  };

  constructor(private formBuilder: FormBuilder, private navCtrl: NavController,
    public authService: AuthService, private dataService: DataService) {
    // authService.getUser().then((data) => {
    //   this.userEmail  = data.email;
    //   console.log(this.userEmail);
    // });

    
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
      ])),
      telephone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ])),
      profileImage: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }


  addMoreUserDetails(form) {
    let firstName = form.firstName;
    let lastName = form.lastName;
    let telephone = form.telephone;
    let imgURL = this.dataService.IMAGE_URL_FROM_FIREBASE;
    console.log(imgURL);
    // this.navCtrl.navigateForward(['/login']);
  }
  
  uploadFile(fileEvent){
    console.log("................",fileEvent);
     this.dataService.fileUpload(fileEvent);
  }
 
}

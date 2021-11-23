import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(public AuthService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  // Reset Password - Email specified recieves the reset token from firebase
  resetPassword(email) {
    // Obtain value from the input-email object
    this.AuthService.initiatePasswordRecovery(email.value).then(
      (res) => {
        this.router.navigateByUrl('/login');
      }
    )
  }

}

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
    this.AuthService.initiatePasswordRecovery(email).then(
      (res) => {
        window.alert("Password reset link sent successfully! Check your mail please");
        this.router.navigate(['login']);
      })
      .catch(error => {
        window.alert("Unsuccessful, try again!")
        this.router.navigate(['/forgot-password']);
      });

  }

}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any;

  constructor(public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth, public router: Router) {

    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Create account with user and password first
  createUser(email, password, otherDetails?) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if (res) {
          res.user.updateProfile({
            displayName: otherDetails?.firstName + ' ' + otherDetails?.lastName,
            photoURL: otherDetails?.imgURL
          }).then(() => {
          }).catch(err => { console.log(err) });
        }
      }
      );
  }

  //  Login
  logIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }
  // Forgot password
  initiatePasswordRecovery(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email has been sent, please check your inbox.');
      }).catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is logged in
  getIsLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign-out
  logOut() {
    if (this.ngFireAuth.currentUser) {
      return this.ngFireAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('/login');
      })
    }
  }
}


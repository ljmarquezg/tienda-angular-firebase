import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //user: User;
  //private user: Observable<firebase.User>;
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.user = afAuth.authState;

    this.user.subscribe(user => {
      if (user) {
        this.userDetails = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        this.userDetails = null;
        localStorage.removeItem('user');
      }
    });
  }

  validateForm(username: string, password: string): Observable<boolean> {
    console.log(username, password);
    if (username === 'admin' && password === 'admin') {
      sessionStorage.setItem('auth', 'true');
      sessionStorage.setItem('username', username);
      return of(true);
    }
    sessionStorage.removeItem('false');
    sessionStorage.removeItem('username');
    return of(false);
  }

  logout() {
    this.afAuth.auth.signOut()
      .then((res) => {
        localStorage.removeItem('user');
        this.router.navigate(['/']);
      });
  }

  async login(email: string, password: string) {
    try {
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      console.log('Loged in', this.afAuth.auth.signInWithEmailAndPassword(email, password));
      this.router.navigate(['shop']);
    } catch (e) {
      alert("Error!" + e.message);
    }
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }

  // logout() {
  //   //   await this.afAuth.auth.signOut();
  //   //   localStorage.removeItem('user');
  //   //   this.router.navigate(['shop']);
  // }

  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   return user !== null;
  // }

  getUserDetails(): firebase.User {
    return this.userDetails;
  }

}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  constructor(/*public afAuth: AngularFireAuth,*/ private router: Router) {
    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.user = user;
    //     localStorage.setItem('user', JSON.stringify(this.user));
    //   } else {
    //     localStorage.setItem('user', null);
    //   }
    // })
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
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('username');
    this.router.navigate(['home']);
  }

  login(email: string, password: string) {
    //   console.log(email, password);
    //   try {
    //     await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    //     this.router.navigate(['shop']);
    //   } catch (e) {
    //     alert("Error!" + e.message);
    //   }
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

  getUser(): boolean {
    if (sessionStorage.auth) {
      return true;
    }
    return false;
  }
}

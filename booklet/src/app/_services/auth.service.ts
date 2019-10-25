import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        public afAuth: AngularFireAuth,
        private router: Router
    ) { }

    doRegister(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
                .then(
                    res => resolve(res),
                    err => reject(err))
        })
    }

    doLogin(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then(
                    res => resolve(res),
                    err => reject(err))
        })
    }

    doLogout() {
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser) {
                this.afAuth.auth.signOut()
                this.router.navigateByUrl('/login');
                resolve();
            }
            else {
                reject();
            }
        });
    }

    doRecover(value) {
        firebase.auth().sendPasswordResetEmail(value.email)
          .then(data => {
            console.log(data);
            this.router.navigateByUrl('/login');
          })
          .catch(err => {
            console.log(` failed ${err}`);
          });
      }

    userDetails() {
        return firebase.auth().currentUser;
    }

    isLoggedIn() {
        if(firebase.auth().currentUser) {
            return true;
        } else {
            return false;
        }
    }
}
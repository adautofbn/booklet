import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),

      email: new FormControl('', Validators.compose([
        Validators.required,
        //Regex para e-mails
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),

      passConfirm: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    }, {validators: [this.passwordMatchValidator]});
  }

  passwordMatchValidator(group: FormGroup) {
    let password = group.controls.password.value;
    let passConfirm = group.controls.passConfirm.value;
    return password === passConfirm ? null : { passNoMatch: true };
  }

  tryRegister() {
    this.authService.doRegister({
      email: this.signUpForm.get('email').value,
      password: this.signUpForm.get('password').value
    })
      .then(res => {
        console.log(res);
        firebase.auth().currentUser.updateProfile({displayName: this.signUpForm.get('username').value});
        this.alertService.success(res.message);
        this.router.navigateByUrl('/login');
      }, err => {
        console.log(err);
        this.alertService.error(err.message);
      })
  }

}

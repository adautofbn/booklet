import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  signUpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),

      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
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
        this.errorMessage = "";
        this.successMessage = "Your account has been created";
        this.router.navigateByUrl('/login');
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      })
  }

}

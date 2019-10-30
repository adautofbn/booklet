import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  hide = true;
  returnUrl: string;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),

      password: new FormControl("", Validators.compose([
        Validators.minLength(6),
        Validators.required
      ]))
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  ionViewWillEnter(){
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.doLogin(
      {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value
      }
    ).then(data => {
      this.loading = false;
      this.router.navigate([this.returnUrl]);
    }).catch(error => {
      this.loading = false;
      this.alertService.error(error.message);
    })
  }

}

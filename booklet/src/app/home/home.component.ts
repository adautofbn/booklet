import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentUser: firebase.User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.currentUser = this.authService.userDetails();
    this.authService.createUserData();
  }

}

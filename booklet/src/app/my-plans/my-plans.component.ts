import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';
import { FirebaseService } from '../_services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-plans',
  templateUrl: './my-plans.component.html',
  styleUrls: ['./my-plans.component.scss'],
})
export class MyPlansComponent implements OnInit {
  plan$: Observable<unknown[]>;

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private router: Router
  ) { 
    this.plan$ = this.firebaseService.retrieveFilteredDocs(
      'plans', 'uid', '==', this.authService.userDetails().uid
      )
  }

  ngOnInit() { }

  navigateToPlanPage(plan) {
    this.router.navigateByUrl('/plan/'+plan.id);
  }
}

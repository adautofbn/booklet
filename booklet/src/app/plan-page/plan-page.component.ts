import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../_services/firebase.service';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-plan-page',
  templateUrl: './plan-page.component.html',
  styleUrls: ['./plan-page.component.scss'],
})
export class PlanPageComponent implements OnInit {

  plan$: Observable<unknown>;
  planId: string;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) { 
    this.planId = this.route.snapshot.paramMap.get('id');
    this.plan$ = this.firebaseService.retrieveDocById('plans',this.planId);
  }

  ngOnInit() { }

  deletePlan() {
    this.firebaseService.deleteDoc('plans',this.planId);
  }

  isOwner(uid) {
    return uid === this.authService.userDetails().uid;
  }
}

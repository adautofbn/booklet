import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../_services/firebase.service';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertService } from '../_services/alert.service';

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
    private authService: AuthService,
    private alertService: AlertService
  ) { 
    this.planId = this.route.snapshot.paramMap.get('id');
    this.plan$ = this.firebaseService.retrieveDocById('plans',this.planId);
  }

  ngOnInit() { }

  deletePlan() {
    this.firebaseService.deleteDoc('plans',this.planId);
    this.alertService.info('Plano deletado com sucesso');
  }

  isOwner(uid) {
    return uid === this.authService.userDetails().uid;
  }
}

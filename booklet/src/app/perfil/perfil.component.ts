import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../_services/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  plan$: Observable<unknown[]>;
  user$: Observable<unknown[]>;
  userId: string;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
    ) { 
      this.userId = this.route.snapshot.paramMap.get('id');
    }

  ngOnInit() {}

  ionViewWillEnter() {
    this.plan$ = this.userId ? this.firebaseService.retrieveUserDocs('plans', this.userId) : 
    this.firebaseService.retrieveUserDocs('plans', this.authService.userDetails().uid);
    this.user$ = this.userId ? this.firebaseService.retrieveUserDocs('users', this.userId) : 
      this.firebaseService.retrieveUserDocs('users', this.authService.userDetails().uid);
  }

  navigateToPlanPage(plan) {
    this.router.navigateByUrl('/plan/'+plan.id);
  }

}

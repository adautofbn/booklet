import { Component, OnInit } from '@angular/core';
import { AngularFirestore, CollectionReference } from '@angular/fire/firestore';
import { Plan } from '../_models/plan.model';
import { AuthService } from '../_services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-plans',
  templateUrl: './my-plans.component.html',
  styleUrls: ['./my-plans.component.scss'],
})
export class MyPlansComponent implements OnInit {
  planCollectionRef: CollectionReference;
  plan$: Observable<unknown[]>;

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.plan$ = this.afs.collection('plans', 
      ref => ref.where('teacher', '==', this.authService.userDetails().displayName)).valueChanges();
  }
}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Plan } from '../_models/plan.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-plans',
  templateUrl: './all-plans.component.html',
  styleUrls: ['./all-plans.component.scss'],
})
export class AllPlansComponent implements OnInit {
  planCollectionRef: AngularFirestoreCollection<Plan>;
  plan$: Observable<Plan[]>;

  constructor(
    private afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.planCollectionRef = this.afs.collection('plans');
    this.plan$ = this.planCollectionRef.valueChanges();
  }

}

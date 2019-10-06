import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FirebaseService } from '../_services/firebase.service';

@Component({
  selector: 'app-all-plans',
  templateUrl: './all-plans.component.html',
  styleUrls: ['./all-plans.component.scss'],
})
export class AllPlansComponent implements OnInit {
  plan$: Observable<unknown[]>;

  constructor(
    private firebaseService: FirebaseService
  ) { 
    this.plan$ = this.firebaseService.retrieveDocs('plans');
  }

  ngOnInit() {

  }

}

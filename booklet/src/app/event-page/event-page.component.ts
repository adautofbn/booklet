import { Component, OnInit } from '@angular/core';
import { AlertService } from '../_services/alert.service';
import { AuthService } from '../_services/auth.service';
import { FirebaseService } from '../_services/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss'],
})
export class EventPageComponent implements OnInit {

  event$: Observable<unknown>;
  eventId: string;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private alertService: AlertService
  ) { 
    this.eventId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.event$ = this.firebaseService.retrieveEventById(this.eventId);
  }

  deleteEvent() {
    this.firebaseService.deleteDoc('events',this.eventId);
    this.alertService.info('Evento deletado com sucesso');
  }

  isOwner(uid) {
    return uid === this.authService.userDetails().uid;
  }

}

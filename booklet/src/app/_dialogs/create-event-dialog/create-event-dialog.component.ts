import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { FirebaseService } from 'src/app/_services/firebase.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { CalendarEvent } from 'src/app/_models/calendar-event.model';

@Component({
  selector: 'app-create-event-dialog',
  templateUrl: './create-event-dialog.component.html',
  styleUrls: ['./create-event-dialog.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class CreateEventDialogComponent implements OnInit {

  types = [{ title: 'Dia todo', value: 0 }, { title: 'Selecionar horário', value: 1 }]
  hours = [...Array(24).keys()];
  minutes = [...Array(60).keys()];

  dialogForm: FormGroup;

  plan$: Observable<unknown[]>;

  constructor(
    private firebaseService: FirebaseService,
    public dialogRef: MatDialogRef<CreateEventDialogComponent>,
    private authService: AuthService
  ) { 
    this.plan$ = this.firebaseService.retrieveLoggedUserDocs('plans');
  }

  ngOnInit() {
    this.dialogForm = new FormGroup({
      title: new FormControl('', Validators.compose([
        Validators.required
      ])),

      type: new FormControl('', Validators.compose([
        Validators.required
      ])),

      startDay: new FormControl('', Validators.compose([
        Validators.required
      ])),

      startTimeHour: new FormControl(null, Validators.compose([

      ])),

      startTimeMinutes: new FormControl(null, Validators.compose([

      ])),

      endDay: new FormControl('', Validators.compose([
        Validators.required
      ])),

      endTimeHour: new FormControl(null, Validators.compose([

      ])),

      endTimeMinutes: new FormControl(null, Validators.compose([

      ])),

      plan: new FormControl(null, Validators.compose([

      ]))
    })
  }

  cancel() {
    this.dialogRef.close({ value: -1, status: 'none' });
  }

  confirm() {
    let result = {
      title: this.dialogForm.get('title').value,
      allDay: this.isAllDay(),
      startTime: this.getTime('start'),
      endTime: this.getTime('end'),
      planTitle: this.dialogForm.get('plan').value.title,
      planId: this.dialogForm.get('plan').value.id,
      uid: this.authService.userDetails().uid
    } as CalendarEvent;

    this.dialogRef.close(result);
  }

  isAllDay() {
    const type = this.dialogForm.get('type').value;

    return (type === 0);
  }

  getTime(field) {
    const type = this.dialogForm.get('type').value;
    var startDay : Date = this.dialogForm.get('startDay').value;
    var endDay : Date = this.dialogForm.get('endDay').value;

    if(field === 'start') {
      startDay.setHours(this.dialogForm.get('startTimeHour').value, this.dialogForm.get('startTimeMinutes').value);
      return startDay;
    } else {
      endDay.setHours(this.dialogForm.get('endTimeHour').value, this.dialogForm.get('endTimeMinutes').value);
      return endDay;
    }
  }

}

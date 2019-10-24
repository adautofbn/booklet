import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MatDialog } from '@angular/material';
import { CreateEventDialogComponent } from '../_dialogs/create-event-dialog/create-event-dialog.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { CalendarEvent } from '../_models/calendar-event.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  eventSource = [];
  viewTitle;
  calendarEventCollectionRef: AngularFirestoreCollection<CalendarEvent>;

  isToday: boolean;
  calendar = {
    locale: 'pt',
    mode: 'month',
    currentDate: new Date(),
    dateFormatter: {
      formatMonthViewDay: function (date: Date) {
        return date.getDate().toString();
      },
      formatMonthViewDayHeader: function (date: Date) {
        return 'MonMH';
      },
      formatMonthViewTitle: function (date: Date) {
        return 'testMT';
      },
      formatWeekViewDayHeader: function (date: Date) {
        return 'MonWH';
      },
      formatWeekViewTitle: function (date: Date) {
        return 'testWT';
      },
      formatWeekViewHourColumn: function (date: Date) {
        return 'testWH';
      },
      formatDayViewHourColumn: function (date: Date) {
        return 'testDH';
      },
      formatDayViewTitle: function (date: Date) {
        return 'testDT';
      }
    }
  };

  constructor(
    private navController: NavController,
    private dialog: MatDialog,
    private afs: AngularFirestore
  ) { }

  ngOnInit() { 
    this.calendarEventCollectionRef = this.afs.collection('events');
  }

  firstLetterToUpper(string: String) {
    return string[0].toUpperCase() + string.slice(1);
  }

  onViewTitleChanged(title) {
    this.viewTitle = this.firstLetterToUpper(title);
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  onCurrentDateChanged(event: Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }

  addEvent() {
    const dialogRef = this.dialog.open(CreateEventDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      let events = this.eventSource;
      events.push(result);
      this.eventSource = [];
      setTimeout(() => {
        this.eventSource = events;
      });

      this.calendarEventCollectionRef.add(result);
    })
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  markDisabled = (date: Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };
}

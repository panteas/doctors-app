import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'app/api/auth/auth.service';
import { CalendarMode } from 'ionic2-calendar/calendar';

@Component({
  selector: 'app-book-doctor',
  templateUrl: 'book-doctor.page.html',
  styleUrls: ['book-doctor.page.scss'],
})
export class BookDoctorPage implements OnInit {
  @Input() doctor: any;
  currentUser;
  doctorFirstName: string;

  eventSource = [];

  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
    step: 30,
  };

  selectedDate = new Date();

  constructor(
    private modal: ModalController,
    private db: AngularFirestore,
    private authService: AuthService
  ) {
    this.db
      .collection(`appointments`)
      .snapshotChanges()
      .subscribe((colSnap) => {
        this.eventSource = [];
        colSnap.forEach((snap) => {
          const event: any = snap.payload.doc.data();
          event.id = snap.payload.doc.id;
          event.startTime = event.startTime.toDate();
          event.endTime = event.endTime.toDate();
          this.eventSource.push(event);
        });
      });
  }

  ngOnInit() {
    this.doctorFirstName = this.doctor.fullName.split(' ')[0];
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  addNewEvent() {
    const start = this.selectedDate;
    const end = this.selectedDate;
    end.setMinutes(end.getMinutes() + 60);

    const event = {
      title: 'Event #' + start.getMinutes(),
      startTime: start,
      endTime: end,
      allDay: false,
      doctorUID: this.doctor.uid,
      userUID: this.currentUser.uid,
    };

    this.db
      .collection(`appointments`)
      .add(event)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        this.addAppointmentID(docRef.id);
      });
  }

  addAppointmentID(appUID) {
    this.authService.addAppointmentIDtoDoctor(this.doctor.uid, appUID);
    this.authService.addAppointmentIDtoUser(this.currentUser.uid, appUID);
  }

  onViewTitleChanged(title) {
    // console.log('title: ' + title);
  }

  onTimeSelected(ev) {
    this.selectedDate = ev.selectedTime;
    // console.log('The selected date: ' + this.selectedDate);
  }

  onEventSelected(ev) {
    // console.log('event selected: ' + ev.selectedTime);
  }

  onCurrentDateChanged(title) {
    // console.log('current date changed: ' + title);
  }

  async close() {
    await this.modal.dismiss({
      dismissed: true,
    });
  }
}

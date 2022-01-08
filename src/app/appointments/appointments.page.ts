import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'app/api/auth/auth.service';

@Component({
  selector: 'app-appointments',
  templateUrl: 'appointments.page.html',
  styleUrls: ['appointments.page.scss'],
})
export class AppointmentsPage {
  currentUser;
  appointmentsUID: any;
  doctors: any[] = [];
  appointments: any;

  constructor(
    private authService: AuthService,
    private af: AngularFireAuth,
    private auth: AngularFireAuth
  ) {}

  async ionViewWillEnter() {
    const tempUser = JSON.parse(localStorage.getItem('user'));
    const userUID = tempUser.uid;

    await this.authService.currentUser(userUID).subscribe((user) => {
      this.currentUser = user;
      this.currentUser['appointments'].forEach((app) => {
        this.appointmentsUID.push(app);
        this.retrieveAppointments(app);
      });
    });
  }

  ionViewDidLeave() {
    this.appointments = [];
    this.appointmentsUID = [];
    this.doctors = [];
  }

  retrieveAppointments(appUID) {
    this.authService.getAppointments(appUID).subscribe((entry) => {
      this.appointments.push(entry);
      this.getDoctor(entry['doctorUID']);
    });
    console.log('appointments:', this.appointments);
    console.log('doctors:', this.doctors);
  }

  getDoctor(doctorUID) {
    this.authService.getOneDoctor(doctorUID).subscribe((doctor) => {
      this.doctors.push(doctor);
    });
  }
}

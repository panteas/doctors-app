import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'app/api/auth/auth.service';
import { Doctor } from 'models/doctor';
import { ModalController } from '@ionic/angular';
import { BookDoctorPage } from 'app/book-doctor/book-doctor.page';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit {
  doctor: any;
  paramURL;
  currentUser;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private modal: ModalController
  ) {}

  ngOnInit() {
    this.route.params.subscribe((paramMap) => {
      console.log(paramMap);
      this.paramURL = paramMap.id;
    });

    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  ionViewWillEnter() {
    // this.authService.getAllDoctors().subscribe((entries) => {
    //   entries.forEach((entry) => {
    //     if (entry.uid === this.paramURL) {
    //       this.doctor = entry;
    //       console.log(this.doctor);
    //     }
    //   });
    // });
    this.authService.getOneDoctor(this.paramURL).subscribe((entries) => {
      this.doctor = entries[0];
    });
  }

  async openModal() {
    const modal = await this.modal.create({
      component: BookDoctorPage,
      componentProps: {
        doctor: this.doctor,
      },
      swipeToClose: true,
    });

    return await modal.present();
  }
}

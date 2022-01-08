import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/api/auth/auth.service';
import { NavController } from '@ionic/angular';
import { Doctor } from 'models/doctor';

@Component({
  selector: 'app-specialisation',
  templateUrl: './specialisation.page.html',
  styleUrls: ['./specialisation.page.scss'],
})
export class SpecialisationPage implements OnInit {
  paramURL;
  doctor: Doctor;
  doctors: Doctor[];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.paramURL = paramMap;
      console.log(this.paramURL);
    });
  }

  ionViewWillEnter() {
    this.authService.getAllDoctors().subscribe((entries) => {
      entries.forEach((entry) => {
        if (entry.specialisation === this.paramURL) {
          this.doctor = entry;
          this.doctors.push(entry);
          console.log(this.doctor);
          console.log(this.doctors);
        }
      });
    });
  }
}

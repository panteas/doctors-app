import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'app/api/auth/auth.service';
import { Doctor } from 'models/doctor';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage {
  doctors: Doctor[];
  specialisations: string[] = [];
  slideOpts: Doctor[] = [];
  currentUser;

  sliderConfig = {
    slidesPerView: 1.5,
    spaceBetween: 8,
    navigation: true,
  };

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private af: AngularFireAuth
  ) {}

  ionViewWillEnter() {
    this.authService.getAllDoctors().subscribe((entries) => {
      this.doctors = entries;
      entries.forEach((entry) => {
        this.specialisations.push(entry.specialisation);
      });
      this.currentUser = this.af.currentUser;
      this.getRandomDoctors();
    });
  }

  ionViewWillLeave() {
    this.doctors = [];
    this.specialisations = [];
    this.slideOpts = [];
  }

  private getRandomDoctors() {
    const dummyDoctors = [...this.doctors];

    let length = 3;

    while (length) {
      const randomIndex = Math.floor(Math.random() * dummyDoctors.length);
      this.slideOpts.push(dummyDoctors[randomIndex]);
      dummyDoctors.splice(randomIndex, 1);
      length--;
    }
  }
}

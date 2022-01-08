import { Component } from '@angular/core';
import { AuthService } from 'app/api/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  currentUser;

  constructor(private authService: AuthService) {}

  ionViewWillEnter() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    this.authService.logout();
  }

  resetPass() {
    this.authService.sendPasswordReset(this.currentUser.email);
  }
}

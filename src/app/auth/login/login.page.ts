import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/api/auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    this.authService.login(form.value);
  }

  onGoogleLogin() {
    this.authService.googleSignIn();
  }
}

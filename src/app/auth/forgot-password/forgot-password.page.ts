import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/api/auth/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  resetPass(f) {
    console.log(f.value.email);
    this.authService.sendPasswordReset(f.value.email);
  }
}

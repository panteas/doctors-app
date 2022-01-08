import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  async displayError(error: any) {
    const toast = await this.toastController.create({
      message: error.message ? error.message : error,
      duration: 3500,
      color: 'danger',
    });
    toast.present();
    console.error(error);
  }

  async displaySuccess(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3500,
      color: 'success',
    });
    toast.present();
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgCalendarModule } from 'ionic2-calendar';

import { IonicModule } from '@ionic/angular';

import { BookDoctorPageRoutingModule } from './book-doctor-routing.module';

import { BookDoctorPage } from './book-doctor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    BookDoctorPageRoutingModule,
  ],
  declarations: [BookDoctorPage],
})
export class BookDoctorPageModule {}

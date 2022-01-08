import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookDoctorPage } from './book-doctor.page';

const routes: Routes = [
  {
    path: '',
    component: BookDoctorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookDoctorPageRoutingModule {}

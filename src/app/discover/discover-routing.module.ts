import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverPage } from './discover.page';

const routes: Routes = [
  {
    path: '',
    component: DiscoverPage,
  },
  {
    path: ':id',
    loadChildren: () =>
      import('../doctor/doctor.module').then((m) => m.DoctorPageModule),
  },
  {
    path: ':specialisation',
    loadChildren: () =>
      import('../specialisation/specialisation.module').then(
        (m) => m.SpecialisationPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscoverPageRoutingModule {}

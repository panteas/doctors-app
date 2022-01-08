import { PrefixNot } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialisationPage } from './specialisation.page';

const routes: Routes = [
  {
    path: 'specialisation',
    component: SpecialisationPage,
    pathMatch: 'prefix',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialisationPageRoutingModule {}

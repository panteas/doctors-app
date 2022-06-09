import { PrefixNot } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialisationPage } from './specialisation.page';

const routes: Routes = [
  {
    path: ':id',
    component: SpecialisationPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecialisationPageRoutingModule {}

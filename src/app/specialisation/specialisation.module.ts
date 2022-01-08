import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialisationPageRoutingModule } from './specialisation-routing.module';

import { SpecialisationPage } from './specialisation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecialisationPageRoutingModule
  ],
  declarations: [SpecialisationPage]
})
export class SpecialisationPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BootPage } from './boot';

@NgModule({
  declarations: [
    BootPage,
  ],
  imports: [
    IonicPageModule.forChild(BootPage),
  ],
})
export class BootPageModule {}

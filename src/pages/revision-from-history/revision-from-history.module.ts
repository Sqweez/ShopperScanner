import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RevisionFromHistoryPage } from './revision-from-history';

@NgModule({
  declarations: [
    RevisionFromHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(RevisionFromHistoryPage),
  ],
})
export class RevisionFromHistoryPageModule {}

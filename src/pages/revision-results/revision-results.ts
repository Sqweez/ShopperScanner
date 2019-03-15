import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RevisionResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-revision-results',
  templateUrl: 'revision-results.html',
})
export class RevisionResultsPage {
  object: any;
  isRevisionOkay = false;
  user = JSON.parse(localStorage.getItem("user_data"));
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.object = this.navParams.get("data");
    if(this.object.message){
      this.isRevisionOkay = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RevisionResultsPage');
  }

}

import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {RevisionFromHistoryPage} from "../revision-from-history/revision-from-history";

/**
 * Generated class for the RevisionsHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-revisions-history',
  templateUrl: 'revisions-history.html',
})
export class RevisionsHistoryPage {
  revisions: any;

  constructor(
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.revisions = this.navParams.get("revisions");
  }

  getRevision(item) {
    try {
      item.items = JSON.parse(item.items);
    }
    catch (e) {

    }
    this.navCtrl.push("RevisionFromHistoryPage", {revision: item})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RevisionsHistoryPage');
  }

}

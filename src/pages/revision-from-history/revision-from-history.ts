import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RevisionFromHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-revision-from-history',
  templateUrl: 'revision-from-history.html',
})
export class RevisionFromHistoryPage {
  revision: any;
  items: any;
  items_slice: any;
  isRevisionOkay = false;
  isTheEndOfList: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.revision = this.navParams.get("revision");
    this.items = this.revision.items;
    this.items_slice = this.items.slice(0, 30);
    console.log(this.items_slice.length);
    if(this.items == 0){
      this.isRevisionOkay = true;
    }
  }
  doInfinite(): Promise<any> {
    console.log("Begin async operation");
    let length = this.items_slice.length;
    return new Promise((resolve => {
      if(length === this.items.length){
        this.isTheEndOfList = true;
        resolve();
      }
      setTimeout(() => {
        for(let i = 0; i < 30; i++){
          this.items_slice.push(this.items[length+i]);
        }
        console.log("Async operation has ended");
        resolve();
      }, 500)
    }))
  }
}



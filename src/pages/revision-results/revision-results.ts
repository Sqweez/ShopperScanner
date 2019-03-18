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
  items_slice: any;
  isTheEndOfList: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.object = this.navParams.get("data");
    if(this.object.message){
      this.isRevisionOkay = true;
    }
    else{
      this.items_slice = this.object.slice(0,30);
    }
    this.createRevisionRow();
  }

  createRevisionRow(){
    let revisions = localStorage.getItem("revisions") ? JSON.parse(localStorage.getItem("revisions")) : [];
    let id = "";
    for(let i = 0; i < 10; i++){
      id += (Math.floor((Math.random() * 10) + 1)).toString();
    }
    let items;
    if(this.isRevisionOkay){
      items = 0;
    }
    else{
      items = JSON.stringify(this.object);
    }
    let date = new Date();
    let new_date = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    revisions.push({id: id, date: new_date, items: items});
    localStorage.setItem("revisions", JSON.stringify(revisions));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RevisionResultsPage');
  }

  doInfinite(): Promise<any> {
    console.log("Begin async operation");
    let length = this.items_slice.length;
    return new Promise((resolve => {
      if(length === this.object.length){
        this.isTheEndOfList = true;
        resolve();
      }
      setTimeout(() => {
        for(let i = 0; i < 30; i++){
          this.items_slice.push(this.object[length+i]);
        }
        console.log("Async operation has ended");
        resolve();
      }, 500)
    }))
  }

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {User} from "../../models/user";
import {ToastProvider} from "../../providers/toast/toast";
import {ReviosionPage} from "../reviosion/reviosion";
import {RevisionsHistoryPage} from "../revisions-history/revisions-history";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user: object = {
    user_name: "",
    user_id: "",
    shop_id: "",
    shop_name: ""
  };
  constructor(public toastProvider: ToastProvider, public navCtrl: NavController) {
    this.user = JSON.parse(localStorage.getItem("user_data"));
    console.log(this.user);
  }

  makeRevision(){
    this.navCtrl.push(ReviosionPage, {user: this.user});
  }

  comingSoon(){
    this.toastProvider.create("Тут пока ничего нет");
  }

  goToRevisionHistory(){
    let revisions = localStorage.getItem("revisions") ? JSON.parse(localStorage.getItem("revisions")): [];
    if(revisions.length == 0){
      this.toastProvider.create("Вы не проводили ни одной ревизии!");
      return 0;
    }
    this.navCtrl.push("RevisionsHistoryPage", {revisions: revisions});
  }

}

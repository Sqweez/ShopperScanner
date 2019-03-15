import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ToastProvider} from "../../providers/toast/toast";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {Http} from "@angular/http";
import {RevisionResultsPage} from "../revision-results/revision-results";

@Component({
  selector: 'page-reviosion',
  templateUrl: 'reviosion.html',
})
export class ReviosionPage {

  user: any = {
    user_name: "",
    user_id: "",
    shop_id: "",
    shop_name: ""
  };
  response: any;
  barcodes = [];
  constructor(
    public http: Http,
    public toastProvider: ToastProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public barcodeScanner: BarcodeScanner) {
    this.user = this.navParams.get("user");
    if(localStorage.getItem("barcodes")){
      let temp_barcodes = localStorage.getItem("barcodes").split(",");
      this.barcodes = temp_barcodes;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviosionPage');
  }

  ionViewDidLeave() {
    let data = this.barcodes.toString();
    localStorage.setItem("barcodes", data);
  }

  scanIt(){
    this.barcodeScanner.scan().then(barcodeData => {
      if(!this.barcodes.includes(barcodeData.text)){
        this.barcodes.push(barcodeData.text);
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  sendToServer(){
    if(this.barcodes.length == 0){
      this.toastProvider.create("Вы не отсканировали ни одного штрих-кода");
      return 0;
    }
    let url = 'http://spv.kz/mobile-app.php';
    let formData = new FormData();
    formData.append("barcodes", this.barcodes.toString());
    formData.append("shop_id", this.user.shop_id);
    formData.append("user_id", this.user.user_id);
    formData.append("action", "makeRevision");
    this.http.post(url, formData).subscribe(data => {
      this.response = data;
      this.response = JSON.parse(this.response._body);
      this.navCtrl.push(RevisionResultsPage, {data: this.response});
      localStorage.removeItem("barcodes");
      this.barcodes = [];
    })
  }

}

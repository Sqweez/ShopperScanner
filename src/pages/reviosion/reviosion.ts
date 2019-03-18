import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
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
  barcodes_ = [];
  isEndOfList = false;
  constructor(
    private platform: Platform,
    public http: Http,
    public toastProvider: ToastProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public barcodeScanner: BarcodeScanner) {
    this.user = this.navParams.get("user");
    if(localStorage.getItem("barcodes")){
      this.barcodes_ = JSON.parse(localStorage.getItem("barcodes"));
      this.barcodes = this.barcodes_.slice(0, 50);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviosionPage');
  }

  ionViewDidLeave() {
    localStorage.setItem("barcodes", JSON.stringify(this.barcodes_));
  }

  scanIt(){
    this.barcodeScanner.scan({
      prompt: "Отсканируйте штрих-код"
    }).then(barcodeData => {
      this.platform.registerBackButtonAction(() => {
        return 0;
      });
      if(!this.barcodes.includes(barcodeData.text)){
        this.barcodes.push(barcodeData.text);
      }
      return 0;
    }).catch(err => {
      console.log('Error', err);
    });
  }

  doInfinite(): Promise<any> {
    console.log("Begin async operation");
    let length = this.barcodes.length;
    return new Promise((resolve => {
      setTimeout(() => {
        if(length === this.barcodes_.length){
          this.isEndOfList = true;
          return resolve();
        }
        for(let i = 0; i < 50; i++){
          this.barcodes.push(this.barcodes_[length+i]);
        }
        console.log("Async operation has ended");
        resolve();
      }, 500)
    }))
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

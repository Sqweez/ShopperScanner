import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";

/**
 * Generated class for the ScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage {

  barcodes: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private scanner: BarcodeScanner) {
  }

  ionViewDidLoad() {

  }

  onScanResult($event){
    console.log($event);
  }


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Toast, ToastController} from "ionic-angular";

/*
  Generated class for the ToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastProvider {
  toast: Toast;
  constructor(public toastController: ToastController) {
  }

  create(message, duration = 2000){
    this.toast = this.toastController.create({
      message,
      duration
    });

    this.toast.present();
  }

}

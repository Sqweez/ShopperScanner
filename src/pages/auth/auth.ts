import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Http} from "@angular/http";
import {ToastProvider} from "../../providers/toast/toast";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
  title: string;
  user: object = {
    name: "",
    pass: ""
  };
  response: any;
  constructor(public toastProvider: ToastProvider, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.title = 'SHOPPER';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthPage');
  }

  submitForm(user){
    let url = 'http://spv.kz/mobile-app.php';
    if(!(user.name.length > 0 && user.pass.length > 0)){
      this.toastProvider.create("Введите имя пользователя и пароль!");
      return 0;
    }
    let data = new FormData();
    data.append("name", user.name);
    data.append("pass", user.pass);
    data.append("action", "auth");
    this.http.post(url, data).subscribe(data => {
      this.response = data;
      this.response = JSON.parse(this.response._body);
      if(this.response.error){
        this.toastProvider.create("Ошибка! Пользователь с такими данными не найден или пароль не верен!");
        return 0;
      }
      localStorage.setItem("user_data", JSON.stringify(this.response));
      this.navCtrl.setRoot(HomePage);
      this.toastProvider.create("Вы успешно авторизованы");
    });
  }

}

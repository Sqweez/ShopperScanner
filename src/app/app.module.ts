import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AuthPage} from "../pages/auth/auth";
import {ReviosionPage} from "../pages/reviosion/reviosion";
import {HttpModule} from "@angular/http";
import { ToastProvider } from '../providers/toast/toast';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {RevisionResultsPage} from "../pages/revision-results/revision-results";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AuthPage,
    ReviosionPage,
    RevisionResultsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AuthPage,
    ReviosionPage,
    RevisionResultsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ToastProvider,
    BarcodeScanner
  ]
})
export class AppModule {}

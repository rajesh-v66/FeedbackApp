import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from "angularfire2";
import { IonicStorageModule } from "@ionic/storage";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ShowResponsePage } from '../pages/show-response/show-response';
import { BootPage } from '../pages/boot/boot';
import { AdminPage } from '../pages/admin/admin'
import { UserAuthenticationProvider } from '../providers/user-authentication/user-authentication';

var FIREBASE_CONFIG = {
  apiKey: "AIzaSyBzdiC1cctxyeI5GA8goUP72W1dkJOXhE4",
  authDomain: "feedbackapp-13a94.firebaseapp.com",
  databaseURL: "https://feedbackapp-13a94.firebaseio.com",
  projectId: "feedbackapp-13a94",
  storageBucket: "feedbackapp-13a94.appspot.com",
  messagingSenderId: "297997924672"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ShowResponsePage,
    LoginPage,
    RegisterPage,
    BootPage,
    AdminPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ShowResponsePage,
    LoginPage,
    RegisterPage,
    BootPage,
    AdminPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserAuthenticationProvider
  ]
})
export class AppModule {}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { HomePage} from '../home/home';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ShowResponsePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-response',
  templateUrl: 'show-response.html',
})
export class ShowResponsePage {

  public message: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events : Events, public storage : Storage) {
    this.message = navParams.get('message');
    console.log(this.message)
  }

  goToHome(){
    this.navCtrl.setRoot(HomePage);
  }

  logout(){
    this.storage.remove('userId');
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowResponsePage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { AdminPage } from '..//admin/admin';

/**
 * Generated class for the BootPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-boot',
  templateUrl: 'boot.html',
})
export class BootPage {

 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingController: LoadingController,
  public storage : Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BootPage');
  }

  ionViewWillEnter(){
    this.storage.ready().then(() => {
      this.storage.get('userId').then((data) => {  
        console.log('data in boot'+data)
        let loader = this.loadingController.create({
          content: "Loading App",
          dismissOnPageChange: true,
          showBackdrop:false,
          spinner:'bubbles'
        });  
      
        loader.present();
        if(data == null){
            this.navCtrl.setRoot(LoginPage);
        }
        else if(data.toUpperCase() === "admin@dxc.com".toUpperCase()){
            this.navCtrl.setRoot(AdminPage);
        }
        else{
            this.navCtrl.setRoot(HomePage);
        }
      });
    });
  } 
}

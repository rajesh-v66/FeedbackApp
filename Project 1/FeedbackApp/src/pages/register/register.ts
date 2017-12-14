import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import {  UserAuthenticationProvider }from '../../providers/user-authentication/user-authentication';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { BootPage } from '../boot/boot';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers : [UserAuthenticationProvider,AngularFireAuth]
})
export class RegisterPage {
  form;
  authError : boolean = false;
  successMsg : string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public userAuthProvider : UserAuthenticationProvider,
  public storage : Storage) {
  }

  ngOnInit(){
    this.form = new FormGroup({
      userId : new FormControl("",Validators.required),
      password : new FormControl("",Validators.required)
    });
  }

  async doRegistration(form){
    this.authError = true;
    this.successMsg =  await this.userAuthProvider.registerUser(form);
    console.log(this.successMsg)
    if(this.successMsg == "SUCCESS"){
        this.storage.set('userId',form.userId);
        this.authError = false;
        if(form.userId.toUpperCase() === 'admin@dxc.com'.toUpperCase()){
          this.navCtrl.setRoot(BootPage);
        }
        else{
          this.navCtrl.setRoot(HomePage);
        }
        
    }
    else{
      this.authError = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}

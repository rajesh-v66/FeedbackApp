import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { BootPage } from '../boot/boot';
import {  UserAuthenticationProvider }from '../../providers/user-authentication/user-authentication';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers : [UserAuthenticationProvider,AngularFireAuth]
})
export class LoginPage {

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

  async ngOnSubmit(form){
    this.authError = true;
    this.successMsg =  await this.userAuthProvider.userLogin(form);
   console.log(this.successMsg)
   if(this.successMsg == "SUCCESS"){
      this.storage.set('userId',form.userId);
      if(form.userId.toUpperCase() === 'admin@dxc.com'.toUpperCase()){
        this.navCtrl.setRoot(BootPage);
      }
      else{
        this.navCtrl.setRoot(HomePage);
      }
      
      this.authError = false;
   }
   else{
      this.authError = true;
   }

  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}

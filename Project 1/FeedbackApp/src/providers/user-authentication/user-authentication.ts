import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the UserAuthenticationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserAuthenticationProvider {

  constructor(public angularFireAuth: AngularFireAuth) {
    console.log('Hello UserAuthenticationProvider Provider');
  }

  async registerUser(form){
    let result;
    let successMsg : string = "";
    try{
      result = await this.angularFireAuth.auth.createUserWithEmailAndPassword(form.userId, form.password);
      successMsg = "SUCCESS";
    }
    catch(e){
      successMsg = e.message;      
      console.log("Exception is"+e);
    }
    console.log("msg"+successMsg)
    return successMsg;
  }

  async userLogin(form){
    let result;
    let successMsg : string = "";
    try{
      result = await this.angularFireAuth.auth.signInWithEmailAndPassword(form.userId, form.password);
      successMsg = "SUCCESS";
    }
    catch(e){
      successMsg = e.message;      
      console.log("Exception is"+e.message);
    }
    console.log("msg"+successMsg)
    return successMsg;
  }

}

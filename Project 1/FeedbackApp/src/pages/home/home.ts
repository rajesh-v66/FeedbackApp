import { Component } from '@angular/core';
import { NavController,LoadingController, Events } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ShowResponsePage } from '../show-response/show-response';
import { Firebase } from '@ionic-native/firebase';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers : [Firebase,AngularFireDatabase]
})
export class HomePage {

  form;
  userEmail : string;
  batchesRef : AngularFireList<any>;
  batches : Observable<any[]>;
  constructor(public navCtrl: NavController,
    public loadingController: LoadingController,
    public events : Events,
    public firebase : Firebase,
    public storage : Storage,
    public angularDB : AngularFireDatabase) {
      this.batchesRef = this.angularDB.list("t_batch");
      this.batches = this.batchesRef.snapshotChanges().map(changes => {
        console.log(changes);
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
  }

    ngOnInit(){
      
      this.storage.ready().then(() => {
        this.storage.get('userId').then((data) => {  
          this.userEmail = data;
        }); 
    });

    this.form =  new FormGroup({
      name : new FormControl(this.userEmail,Validators.required),
      batch : new FormControl("",Validators.required),
      info: new FormControl("",Validators.required),
      handsOn : new FormControl("",Validators.required),
      organized : new FormControl("",Validators.required),
      objectives: new FormControl("",Validators.required),
      preparation : new FormControl("",Validators.required),
      satisfaction : new FormControl("",Validators.required),
      comments : new FormControl("")
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    
  }

  logout(){
    this.storage.remove('userId');
    this.navCtrl.setRoot(LoginPage);
  }

  onSubmit = function (frmRequest){
    

    this.firebase.logEvent("RESPONSE",
      { "EMAIL_ID" : this.userEmail,
        "NAME" : frmRequest.name,
        "BATCH" : frmRequest.batch,
        "QUESTION" :"INFORMATION", 
        "CHOICE" : frmRequest.info
      }).then(()=>{
        console.log("Response Logged"+frmRequest.batch);
      });

      this.firebase.logEvent("RESPONSE",
      { "EMAIL_ID" : this.userEmail,
        "NAME" : frmRequest.name,
        "BATCH" : frmRequest.batch,
        "QUESTION" :"HANDS-ON", 
        "CHOICE" : frmRequest.handsOn
      }).then(()=>{
        console.log("Response Logged");
      });

      this.firebase.logEvent("RESPONSE",
      { "EMAIL_ID" : this.userEmail,
        "NAME" : frmRequest.name,
        "BATCH" : frmRequest.batch,
        "QUESTION" :"ORGANIZED", 
        "CHOICE" : frmRequest.organized
      }).then(()=>{
        console.log("Response Logged");
      });

      this.firebase.logEvent("RESPONSE",
      { "EMAIL_ID" : this.userEmail,
        "NAME" : frmRequest.name,
        "BATCH" : frmRequest.batch,
        "QUESTION" :"OBJECTIVES", 
        "CHOICE" : frmRequest.objectives
      }).then(()=>{
        console.log("Response Logged");
      });

      this.firebase.logEvent("RESPONSE",
      { "EMAIL_ID" : this.userEmail,
        "NAME" : frmRequest.name,
        "BATCH" : frmRequest.batch,
        "QUESTION" :"PREPARATION", 
        "CHOICE" : frmRequest.preparation
      }).then(()=>{
        console.log("Response Logged");
      });

      this.firebase.logEvent("RESPONSE",
      { "EMAIL_ID" : this.userEmail,
        "NAME" : frmRequest.name,
        "BATCH" : frmRequest.batch,
        "QUESTION" :"SATISFACTION", 
        "CHOICE" : frmRequest.satisfaction
      }).then(()=>{
        console.log("Response Logged");
      });

      this.firebase.logEvent("RESPONSE",
      { "EMAIL_ID" : this.userEmail,
        "NAME" : frmRequest.name,
        "BATCH" : frmRequest.batch,
        "QUESTION" :"COMMENTS", 
        "CHOICE" : frmRequest.comments
      }).then(()=>{
        console.log("Response Logged");
      });

    let loader = this.loadingController.create({
      content: "Sending Feedback",
      dismissOnPageChange: true,
      showBackdrop:false,
      spinner:'bubbles'
    });  

    loader.present();

    this.navCtrl.push(ShowResponsePage, {
      message : 'Thank you for your valuable feedback on this Presentation. \
                Your Response are submitted.'
    });
  }

}

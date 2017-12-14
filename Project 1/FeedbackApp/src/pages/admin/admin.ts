import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
  providers:[AngularFireDatabase]
})
export class AdminPage {

  batchesRef : AngularFireList<any>;
  batches : Observable<any[]>;
  batchName : string;
  userEmail : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public angularDB : AngularFireDatabase,public storage : Storage) {
    this.batchesRef = this.angularDB.list("t_batch");
    this.batches = this.batchesRef.snapshotChanges().map(changes => {
      console.log(changes);
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
    console.log(this.batches);
  }

  ngOnInit(){
    
    this.storage.ready().then(() => {
      this.storage.get('userId').then((data) => {  
        this.userEmail = data;
      }); 
  });
}

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  addBatch(){
    this.angularDB.list("t_batch").push( { batch_name : this.batchName} );
    this.batchName = '';
  }

  removeBatch(batchId){
    console.log("batchId is"+batchId)
    this.angularDB.list("t_batch").remove(batchId);
  }

  logout(){
    this.storage.remove('userId');
    this.navCtrl.setRoot(LoginPage);
  }

}

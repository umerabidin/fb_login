import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

profile_name: string;
email_address: string;
userData: any;
profile_image: string;
username: string;
  constructor(public navCtrl: NavController,
     private facebook: Facebook,
    private toastCtrl: ToastController,
    private storage: Storage) {

  }

loginFb() {
  this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
    this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
      this.userData = {email: profile['email'], first_name: profile['first_name'], last_name: profile['last_name'], 
      picture: profile['picture_large']['data']['url'], username: profile['name']}
this.email_address = this.userData.email;
this.profile_name = this.userData.first_name; 
this.profile_image = this.userData.picture;
    });
  });
}

storeData(){
 this.storage.set('profile_name', this.profile_name);
 this.storage.set('email_address', this.email_address);
}

getValues(){
  this.storage.get('profile_name').then((val) => {
    this.profile_name = val;

  });

  this.storage.get('email_address').then((val) => {
    this.email_address = val;

  });
  this.storage.get('profile_image').then((val) => {
    this.profile_image = val;

  });
 }
presentToast(message: string) {
  let toast = this.toastCtrl.create({
    message: message,
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
}

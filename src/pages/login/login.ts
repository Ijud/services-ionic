import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { ProviderHomePage} from '../provider-home/provider-home'


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {email:'',password:''};

  constructor(public nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public navParams: NavParams) {}

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(res => {
      console.log(res)
      // if (true === true) {
      //   window.localStorage.setItem( 'authToken', 'WSbmlVC3/S0LDXtU8MiWXndaD9OYrwuGV2ns99DGh1cPOuIquI5jc+qBHQV5u2hX43Y=' );
      //   console.log(window.localStorage.getItem( 'authToken'));
      //   this.loading.dismiss();
      //   this.nav.setRoot(HomePage);
      if (res.authToken) {
        window.localStorage.setItem( 'authToken', res.authToken );
        console.log(res);
        console.log(window.localStorage.getItem( 'authToken'));
        setTimeout(() => {
          this.loading.dismiss();
          if(res.client){
            this.nav.setRoot(HomePage)
          } else {
            this.nav.setRoot(ProviderHomePage)
          }
        });
      } else {
        this.showError('Invalid Credentials');
      }
    },
    error => {
      this.showError(error);
    });
    // this.auth.login(this.registerCredentials).subscribe(allowed => {
    //   if(allowed) {
    //     setTimeout(() => {
    //       this.loading.dismiss();
    //       this.nav.setRoot(HomePage)
    //     });
    //   } else {
    //     this.showError("Access Denied");
    //   }
    // }, error => {
    //   this.showError(error);
    // });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Failure',
      subTitle: text,
      buttons: ["OK"]
    });
    alert.present(prompt);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}

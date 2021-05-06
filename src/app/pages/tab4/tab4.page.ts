
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthActions, AuthObserver, AuthService, IAuthAction } from 'ionic-appauth';
import { ModalController, NavParams } from '@ionic/angular';

import { ModalPost } from '../modal-post/modal-post';
import { EditProfile } from '../edit-profile/edit-profile';
import { Options } from '../options/options';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],

})
export class Tab4Page implements OnInit, OnDestroy{

  userInfo = this.auth.session.user;
  action: IAuthAction;
  authObserver: AuthObserver;
  nav: any;



  constructor(private auth: AuthService, public modalCtrl: ModalController) {
  }

  public profile_segment: string;

  // You can get this data from your API. This is a dumb data for being an example.
    //  id: 1,
    //  username: 'candelibas',
    //  profile_img: 'https://avatars1.githubusercontent.com/u/918975?v=3&s=120',
    //  post_img: 'https://scontent-cdg2-1.cdninstagram.com/t51.2885-15/e35/13473123_1544898359150795_654626889_n.jpg'


  // Define segment for everytime when profile page is active
  ionViewWillEnter() {
    this.profile_segment = 'grid';
  }

  //goEditProfile() {
    // Open it as a modal page
  //  let modal = this.modalCtrl.create(EditProfile);
  //  modal.present();
  //}

  goOptions() {
    this.nav.push(Options, {});
  }

  ngOnInit() {
    this.auth.loadTokenFromStorage();
    this.authObserver = this.auth.addActionListener((action) => this.onAction(action));
    this.getUserInfo();
  }

  ngOnDestroy() {
    this.auth.removeActionObserver(this.authObserver);
  }

  private onAction(action: IAuthAction) {
    if (action.action === AuthActions.LoadTokenFromStorageFailed ||
      action.action === AuthActions.SignInFailed ||
      action.action === AuthActions.SignOutSuccess) {
      delete this.action;
    } else if (action.action === AuthActions.LoadUserInfoSuccess) {
      this.userInfo = action.user;
    } else {
      this.action = action;
    }
  }

  public signOut() {
    this.auth.signOut();
  }

  public signIn() {
    this.auth.signIn().catch(error => console.error(`Sign in error: ${error}`));
  }

  public async getUserInfo(): Promise<void> {
    this.auth.loadUserInfo();
    this.userInfo;
  }

  public async refreshToken(): Promise<void> {
    this.auth.refreshToken();
  }
}



import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthActions, AuthObserver, AuthService, IAuthAction } from 'ionic-appauth';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit, OnDestroy{

  userInfo = this.auth.session.user;
  action: IAuthAction;
  authObserver: AuthObserver;

  constructor(private navCtrl: NavController, private auth: AuthService) {
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


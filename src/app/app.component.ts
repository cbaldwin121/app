import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { TabsPage } from './tabs/tabs.page';
import { OAuthService } from 'angular-oauth2-oidc';
import { LoginPage } from './login/login.page';

import { AuthObserver } from 'ionic-appauth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage: any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    oauthService: OAuthService) {
    if (oauthService.hasValidIdToken()) {
      this.rootPage = TabsPage;
    } else {
    this.rootPage = LoginPage;
    }

    platform.ready().then(() => {
    statusBar.styleDefault();
    splashScreen.hide();
    });
  }
}

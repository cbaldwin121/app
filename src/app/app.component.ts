import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';

import { Plugins } from '@capacitor/core';

const { SplashScreen } = Plugins;

import { AuthObserver } from 'ionic-appauth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  authObserver: AuthObserver;

  constructor(
    private platform: Platform,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('mobile') && !this.platform.is('mobileweb')) {
        SplashScreen.hide();
      }
      
    });
  }
}

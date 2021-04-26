import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Amplify Configuration
import Amplify, { Auth } from 'aws-amplify';
import Storage from '@aws-amplify/storage';
import AWSConfig from './aws-exports';
Storage.configure(AWSConfig);
Auth.configure(AWSConfig);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
import { ModalController } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './service/auth/auth.module';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { LoginPageModule } from './login/login.module';
import { OAuthModule } from 'angular-oauth2-oidc';

import { IonicStorageModule } from '@ionic/storage';
//We also make use of the Ionic Storage not to store the files but the path to a file later on

/* Add Amplify imports */
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';
import Amplify, { Storage } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { LoginPage } from './login/login.page'
import { OAuthService } from 'angular-oauth2-oidc';
import { ModalPost } from './modal-post/modal-post';


/* Configure Amplify resources */
Amplify.configure(awsconfig);

@NgModule({
  declarations: [AppComponent, ModalPost],
  entryComponents: [LoginPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule,
    AmplifyUIAngularModule,
    BrowserModule,
    OAuthModule.forRoot(),
    AuthModule,
    LoginPageModule
    ],
  providers: [
    Camera,
    File,
    SplashScreen,
    WebView,
    OAuthService,
    StatusBar,
    ModalController,
    AuthModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

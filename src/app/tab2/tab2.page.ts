import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { PhotoService } from '../service/photo.service';
import { Auth } from 'aws-amplify'
import { CognitoUser } from '@aws-amplify/auth'


const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

//This array will only contain the name of a file like “1234.png”,
//so for each entry we need to resolve the name to the local path of our app which we add to the object as filePath.

export class Tab2Page{
  constructor(public photoService: PhotoService) { }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  uploadPost(){
    //do nothing right now but should make a service that takes img and description and connects with graphql to store post so you can display
  }
}

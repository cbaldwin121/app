import { ModalController } from '@ionic/angular';

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { PhotoService } from '../../service/photo.service';
import { Auth, input } from 'aws-amplify'
import { CognitoUser } from '@aws-amplify/auth'
import { ModalPost } from '../modal-post/modal-post';


const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

//This array will only contain the name of a file like “1234.png”,
//so for each entry we need to resolve the name to the local path of our app which we add to the object as filePath.
//export class imgPost
//{
//  img: string;
//  description: string
//}

export class Tab2Page{
  constructor(public photoService: PhotoService, public modalCtrl: ModalController) { }

  public photoDescription: string;
  //public postList: Array<imgPost> = [];
  public child_name: string;

  addPhotoToGallery() {
    return this.photoService.addNewToGallery();
  }


  // Triggers when user pressed a post
  pressPhoto(user_id: number, username: string, profile_img: string, post_img: string) {
    this.presentModal(user_id, username, profile_img, post_img, this.child_name);
  }

  // Set post modal
  async presentModal(user_id: number, username: string, profile_img: string, post_img: string, child_name: string) {
    let modal = await this.modalCtrl.create({
      component: ModalPost,
      cssClass: 'my-custom-class',
      componentProps: {
        user_id,
        username: 'N/A',
        post_img: this.addPhotoToGallery(),
        photoDescription: '',
        child_name
      }
    })
    return await modal.present();
  }
  async uploadPost(){

  //  const img = this.addPhotoToGallery();

  //  let newPost = new imgPost();
  //  //newPost.img =

  //  this.photoService.savePost(await img, this.photoDescription)
  //  //do nohis.photoServicething right now but should make a service that takes img and description and connects with graphql to store post so you can display
  }
}

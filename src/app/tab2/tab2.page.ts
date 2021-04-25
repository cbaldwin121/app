import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { HttpClient } from '@angular/common/http';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { Auth } from 'aws-amplify'
import { CognitoUser } from '@aws-amplify/auth'
import { UserService } from '../service/user.service';

import { UserModel } from '../models/user.model';

const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

//This array will only contain the name of a file like “1234.png”,
//so for each entry we need to resolve the name to the local path of our app which we add to the object as filePath.

export class Tab2Page{
  images = []; //this is the array that will contain all the photos http

  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  private storage: Storage; //I don't why but this needs to be outside the constructor or error is throw
  platform: any;

  constructor(private camera: Camera, private file: File, private http: HttpClient, private webview: WebView,
    private actionSheetController: ActionSheetController, private toastController: ToastController,
    private plt: Platform, private loadingController: LoadingController,
    private ref: ChangeDetectorRef) { }

    public filePath: FilePath
    ngOnInit() {
      this.plt.ready().then(() => {
      this.loadStoredImages(); //loads already posted images
      });
    }

     loadStoredImages() {
       this.storage.get(STORAGE_KEY).then(images => {
         if (images) {
           let arr = JSON.parse(images);
           this.images = [];
           for (let img of arr) {
             let filePath = this.file.dataDirectory + img;
             let resPath = this.pathForImage(filePath);
             this.images.push({ name: img, path: resPath, filePath: filePath });
           }
         }
       });
     }

//     //Creates path for images-- need to use this path to save photos in database
     pathForImage(img) {
       if (img === null) {
         return '';
       } else {
         let converted = this.webview.convertFileSrc(img);
         return converted;
       }
     }

//     //to display the image we need another path--- this is want webview.convertFileSr() does
//     //it resolves a file:// path to a path that the WebView understands
//     //all this information goes to the local array (img[])
     async presentToast(text) {
       const toast = await this.toastController.create({
           message: text,
           position: 'bottom',
           duration: 3000
       });
       toast.present();
     }

//     //add new images-- display an action sheet from which the user can either select the camera or photo library as a source
//     //we store the real FILE_URL of the image
     async selectImage() {
       const actionSheet = await this.actionSheetController.create({
           header: "Select Image source",
           buttons: [
               {
                   text: 'Use Camera',
                   handler: () => {
                       this.takePicture(this.camera.PictureSourceType.CAMERA);
                   }
               },
               {
                   text: 'Cancel',
                   role: 'cancel'
               }
            ]
       });
       await actionSheet.present();
     }


//     //after the image is selected we copy the file over to our apps data directory with a new name so we are
//     //not more dependent on where the file reall exists
     takePicture(sourceType: PictureSourceType) {
       var options: CameraOptions = {
           quality: 100,
           sourceType: sourceType,
           saveToPhotoAlbum: false,
           correctOrientation: true
       };

       this.camera.getPicture(options).then(imagePath => {
           if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
               this.filePath.resolveNativePath(imagePath)
                   .then(filePath => {
                       let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                       let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                       this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                   });
           } else {
               var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
               var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
               this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
           }
       });
     }

     createFileName() {
       var d = new Date(),
           n = d.getTime(),
           newFileName = n + ".jpg";
       return newFileName;
      }

   copyFileToLocalDir(namePath, currentName, newFileName) {
       this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
           this.updateStoredImages(newFileName);
       }, error => {
           this.presentToast('Error while storing file.');
       });
   }

   updateStoredImages(name) {
       this.storage.get(STORAGE_KEY).then(images => {
           let arr = JSON.parse(images);
           if (!arr) {
               let newImages = [name];
               this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
           } else {
               arr.push(name);
               this.storage.set(STORAGE_KEY, JSON.stringify(arr));
           }

           let filePath = this.file.dataDirectory + name;
           let resPath = this.pathForImage(filePath);

           let newEntry = {
               name: name,
               path: resPath,
               filePath: filePath
           };

           this.images = [newEntry, ...this.images];
           this.ref.detectChanges(); // trigger change detection cycle
       });
    }


//     //remove the object from our local images array
//     //remove the item from the Ionic Storage
//     //Remove the actual file from our app folder
     deleteImage(imgEntry, position) {
       this.images.splice(position, 1);

       this.storage.get(STORAGE_KEY).then(images => {
           let arr = JSON.parse(images);
           let filtered = arr.filter(name => name != imgEntry.name);
           this.storage.set(STORAGE_KEY, JSON.stringify(filtered));

           var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);

           this.file.removeFile(correctPath, imgEntry.name).then(res => {
               this.presentToast('File removed.');
           });
       });
      }
   startUpload(imgEntry) {
     this.file.resolveLocalFilesystemUrl(imgEntry.filePath)
         .then(entry => {
             ( < FileEntry > entry).file(file => this.readFile(file))
         })
         .catch(err => {
             this.presentToast('Error while reading file.');
         });
    }

  readFile(file: any) {
     const reader = new FileReader();
     reader.onload = () => {
         const formData = new FormData();
         const imgBlob = new Blob([reader.result], {
             type: file.type
         });
         formData.append('file', imgBlob, file.name);
         this.uploadImageData(formData);
     };
     reader.readAsArrayBuffer(file);
    }

async uploadImageData(formData: FormData) {
     const loading = await this.loadingController.create({
         message: 'Uploading image...',
     });
     await loading.present();

     this.http.post("http://localhost:8888/upload.php", formData)
         .pipe(
             finalize(() => {
                 loading.dismiss();
             })
         )
         .subscribe(res => {
             if (res['success']) {
                 this.presentToast('File upload complete.')
             } else {
                 this.presentToast('File upload failed.')
             }
         });
  }
}

import { Platform } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Injectable } from '@angular/core';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  private isNative = false;

  constructor(private ptl: Platform, private transfer: FileTransfer, private file: File, private permissions: AndroidPermissions) {
    this.isNative = ptl.is('cordova') ? true : false;
  }

  writeJsonFile(item: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.isNative === false) {
        const data = 'data:text/json;charset=utf8,' + encodeURIComponent(JSON.stringify(item));
        // this.downloadFile(data, 'favorites.json');
        const a = document.createElement('a');
        a.href = data;
        a.download = 'favorites.json';
        // document.getElementById('download').appendChild(a);
        a.click();
        // document.getElementById('download').removeChild(a);
        console.log('a');
        resolve();
      } else {
        this.permissions.checkPermission(this.permissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then((response) => {
          if (response.hasPermission === false) {
            this.requestStorage().then((result) => {
              if (result.hasPermission === true) {
                this.nativeWrite(item).then(() => resolve()).catch((err) => reject(err));
              } else {
                reject('Writing permission refused');
              }
            }).catch((err) => {
              reject('Error during permission requesting : ' + err);
            });
          } else {
            this.nativeWrite(item).then((file) => resolve(file)).catch((err) => reject(err));
          }
        }).catch((err) => {
          reject('Error during permission check : ' + err);
        });
      }
    });
  }

  private requestStorage() {
    return this.permissions.requestPermission(this.permissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
  }

  private nativeWrite(item: any): Promise<FileEntry> {
    const data = 'data:text/json;charset=utf8,' + encodeURIComponent(JSON.stringify(item));
    const fileTransfer: FileTransferObject = this.transfer.create();
    return fileTransfer.download(data, this.file.externalRootDirectory + 'Download/favorites.json');
  }
}

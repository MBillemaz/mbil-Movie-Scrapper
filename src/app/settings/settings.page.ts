import { HttpClient } from '@angular/common/http';
import { Favorites } from 'typings/storage';
import { StorageProviderService } from './../services/storage-provider.service';
import { Component, OnInit } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public info;
  constructor(public storage: StorageProviderService, public http: HttpClient, private transfer: FileTransfer, private file: File) { }

  ngOnInit(): void {
  }

  downloadJsonFile() {
    this.storage.getFavorites().then((fav) => {
      const data = 'data:text/json;charser=utf8,' + encodeURIComponent(JSON.stringify(fav));
      // this.downloadFile(data, 'favorites.json');
      const a = document.createElement('a');
      a.href = data;
      a.download = 'favorites.json';
      document.getElementById('download').appendChild(a);
      a.click();
      document.getElementById('download').removeChild(a);
    }).catch((e) => console.log(e));
  }

  // downloadJsonFile() {
  //   this.storage.getFavorites().then((fav) => {
  //     const data = 'data:text/json;charser=utf8,' + encodeURIComponent(JSON.stringify(fav));

  //     const fileTransfer: FileTransferObject = this.transfer.create();
  //     fileTransfer.download(data, this.file.externalDataDirectory + 'favorites.json').then((entry) => {
  //       console.log('download complete: ' + entry.toURL());
  //     }, (error) => {
  //       // handle error
  //     });
  //   }).catch((e) => console.log(e));
  // }

  onJsonFileChange(event) {
    this.info = null;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.type !== 'application/json') {
        this.info = 'Invalid type file';
        return;
      }

      const reader = new FileReader();
      reader.onloadend = (evt) => {
        const target: any = evt.currentTarget;
        const fav: Favorites = JSON.parse(target.result);
        if (!fav.series || !fav.movie) {
          this.info = 'Invalid json file';
          return;
        } else {
          this.storage.getFavorites().then((actualFav) => {
            fav.movie.forEach((movie) => {
              if (!actualFav.movie.some((actualMovie) => actualMovie.id === movie.id)) {
                actualFav.movie.push(movie);
              }
            });

            fav.series.forEach((serie) => {
              const index = actualFav.series.findIndex((favSerie) => favSerie.id === serie.id);

              if (index === -1) {
                actualFav.series.push(serie);
              } else {
                const actualSerie = actualFav.series[index];
                serie.likedEpisode.forEach((episode) => {
                  if (!actualSerie.likedEpisode.some((actualEpisode) => actualEpisode.id === episode.id)) {
                    actualSerie.likedEpisode.push(episode);
                  }
                });
              }
            });
            console.log('test', actualFav);
            this.storage.set('favorites', actualFav).then(() => this.info = 'Favorites added').catch((e) => this.info = 'Error ' + e);
          });

        }
      };

      reader.readAsText(file);

    }

  }
}

import { FileEntry } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Platform } from '@ionic/angular';
import { FileStorageService } from './../services/file-storage.service';
import { Favorites } from 'typings/storage';
import { StorageProviderService } from './../services/storage-provider.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public info;
  public isNative;

  constructor(
    private ptl: Platform,
    public storage: StorageProviderService,
    public fileStorage: FileStorageService,
    public sharing: SocialSharing
  ) {
    this.isNative = ptl.is('cordova') ? true : false;
  }

  ngOnInit(): void {
  }

  share() {
    this.storage.getFavorites().then((fav) => {

      this.fileStorage.writeJsonFile(fav).then((file: FileEntry | undefined) => {
        if (file) {
          const options = {
            subject: 'Favorite movies',
            chooserTitle: 'Share my favorites',
            files: [file.nativeURL]
          };

          this.sharing.shareWithOptions(options).then((result) => {
            if (result.completed) {
              this.info = 'Favorites shared';
            } else {
              this.info = 'Sharing canceled';
            }
          }).catch((err) => this.info = 'Sharing error :' + err);
        } else {
          this.info = 'Error during file génération';
        }
      }).catch((err) => {
        this.info = err;
      });

    });
  }

  downloadJsonFile() {
    this.info = null;
    this.storage.getFavorites().then((fav) => {
      this.fileStorage.writeJsonFile(fav).then(() => {
        this.info = 'File downloaded in Download folder';
      }).catch((err) => {
        this.info = err;
      });
    }).catch((e) => console.log(e));
  }

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
            this.storage.set('favorites', actualFav).then(() => this.info = 'Favorites added').catch((e) => this.info = 'Error ' + e);
          });

        }
      };

      reader.readAsText(file);

    }

  }
}

import { Favorites } from 'typings/storage';
import { StorageProviderService } from './../services/storage-provider.service';
import { Component, OnInit } from '@angular/core';
// import * as fs from 'file-system';
import { FileSystem } from '@ionic-native/file';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public info;
  constructor(public storage: StorageProviderService) { }

  ngOnInit(): void {
  }

  writeFile() {


  }

  downloadFile() {
    this.storage.getFavorites().then((fav) => {
      const data = 'data:text/json;charser=utf8,' + encodeURIComponent(JSON.stringify(fav));
      const a = document.createElement('a');
      a.href = data;
      a.download = 'favorites.json';
      document.getElementById('download').appendChild(a);
      a.click();
      document.removeChild(a);
    }).catch((e) => console.log(e));
  }

  uploadFile() {

  }

  onFileChange(event) {
    this.info = null;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      if (file.type !== 'application/json') {
        this.info = 'Invalid type file';
        return;
      }

      const reader = new FileReader();
      reader.onloadend = (evt) => {
        const fav: Favorites = JSON.parse(evt.currentTarget.result);
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

import { EpisodeDetail } from './../../../typings/api.d';
import { DataProviderService } from './../services/data-provider.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Episode } from 'typings/api';
import { StorageProviderService } from '../services/storage-provider.service';
import { Favorites, StoredData } from 'typings/storage';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.page.html',
  styleUrls: ['./episode.page.scss'],
})
export class EpisodePage implements OnInit {

  public id;
  public item: EpisodeDetail;
  public serieTitle: string;

  public liked = false;
  private favorites: Favorites;

  constructor(public dataProvider: DataProviderService, private route: ActivatedRoute, private storage: StorageProviderService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.serieTitle = params['title'];
      this.dataProvider.getById(this.id).then((x) => {
        this.item = x.data;
        this.storage.getFavorites().then((fav: Favorites) => {
          this.favorites = fav;
          if (fav.series.some((serie: StoredData) => {
            return serie.title === this.serieTitle &&
            serie.likedEpisode.some((episode) => episode.episode === this.item.Episode && episode.season === this.item.Season);
          })) {
            this.liked = true;
          }
        });
      });
    });
  }

  setDefaultImage(image) {
    image.target.src = 'assets/img/none.jpg';
  }

  setLiked() {
    let serieFav = this.favorites.series.find((x) => x.id === this.item.seriesID);
    console.log(this.item.seriesID);
    if (this.liked === false) {
      const episode = {
        episode: this.item.Episode,
        id: this.id,
        season: this.item.Season,
        title: this.item.Title
      };

      if (serieFav) {
        const index = this.favorites.series.indexOf(serieFav);
        serieFav.likedEpisode.push(episode);
        this.favorites.series[index] = serieFav;
      } else {
        serieFav = {
          title: this.serieTitle,
          id: this.item.seriesID,
          poster: 'http://img.omdbapi.com/?apikey=75522b56&h=600&i=' + this.id,
          likedEpisode: [episode]
        };
        this.favorites.series.push(serieFav);
      }
    } else {
      serieFav.likedEpisode = serieFav.likedEpisode.filter((x) => x.id !== this.id);
      const index = this.favorites.series.indexOf(serieFav);
      this.favorites.series[index] = serieFav;
    }

    this.storage.set('favorites', this.favorites).then(() => this.liked = !this.liked).catch();
  }

}

import { HttpProviderService } from './../services/http-provider.service';
import { Favorites, StoredData } from './../../../typings/storage.d';
import { StorageProviderService } from './../services/storage-provider.service';
import { Data } from './../../../typings/api.d';
import { DataProviderService } from '../services/data-provider.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  public item: Data;
  public type;
  public id;

  public trailerUrl: SafeResourceUrl;
  public trailerAvailable = false;

  private tryPoster = false;

  public liked = false;
  private favorites: Favorites;

  constructor(
    public dataProvider: DataProviderService,
    private route: ActivatedRoute,
    private storage: StorageProviderService,
    private http: HttpProviderService,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.type = params['type'];
      this.dataProvider.getById(this.id).then((x) => {
        this.item = x.data;
        if (this.type === 'movie') {
          this.http.get(
            'https://www.googleapis.com/youtube/v3/search',
            {
              key: 'AIzaSyD9DzZCKJBZgAuI6wS4ceHqabFQyk43Oss',
              part: 'snippet',
              maxResults: '1',
              q: this.item.Title + ' trailer ' + this.item.Year
            },
            {}
          ).then((youtubeResult) => {
            this.trailerUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
              'https://www.youtube.com/embed/' +
              youtubeResult.data.items[0].id.videoId );
              this.toggleTrailerAvailable();
          });
        }
      });

      this.storage.getFavorites().then((fav: Favorites) => {
        this.favorites = fav;
        if (fav[this.type].some((x) => {
          return x.id === this.id;
        })) {
          this.liked = true;
        }
      });
    });
  }

  setDefaultImage(image) {
    if (this.tryPoster) {
      image.target.src = 'assets/img/none.jpg';
    } else {
      image.target.src = this.item.Poster;
      this.tryPoster = true;
    }

  }

  toggleTrailerAvailable() {
    this.trailerAvailable = !this.trailerAvailable;
  }

  counter(i: string) {
    return new Array(parseInt(i, 10));
  }

  setLiked() {
    if (this.liked === false) {
      const newFav: StoredData = {
        title: this.item.Title,
        id: this.item.imdbID,
        poster: this.item.Poster
      };
      if (this.type === 'series') {
        newFav.likedEpisode = [];
      }
      this.favorites[this.type].push(newFav);
    } else {
      this.favorites[this.type] = this.favorites[this.type].filter((x) => {
        return x.id !== this.id;
      });
    }

    this.storage.set('favorites', this.favorites).then(() => this.liked = !this.liked).catch();
  }

}

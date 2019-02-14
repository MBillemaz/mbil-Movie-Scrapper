import { Favorites } from './../../../typings/storage.d';
import { StorageProviderService } from './../services/storage-provider.service';
import { DataProviderService } from './../services/data-provider.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Season } from 'typings/api';
import { StoredData } from 'typings/storage';

@Component({
  selector: 'app-season',
  templateUrl: './season.page.html',
  styleUrls: ['./season.page.scss'],
})
export class SeasonPage implements OnInit {

  public item: Season;
  public id;
  public liked = false;
  public season;

  // private favorites: Favorites;
  constructor(public dataProvider: DataProviderService, private route: ActivatedRoute, private storage: StorageProviderService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.season = params['season'];
      this.dataProvider.getSeason(this.id, this.season).then((x) => {
        this.item = x.data;
      });
    });

    // this.storage.getFavorites().then((fav: Favorites) => {
    //   this.favorites = fav;
    //   if (fav.series.some((x) => {
    //     return x.id === this.id && x.likedSeason.some((season) => season === this.season);
    //   })) {
    //     this.liked = true;
    //   }
    // });
  }

  setDefaultImage(image) {
    image.target.src = 'assets/img/none.jpg';
  }

  // setLiked() {
  //   let seasonFav = this.favorites.series.find((x) => x.id === this.id);
  //   if (this.liked === false) {
  //     if (seasonFav) {
  //       const index = this.favorites.series.indexOf(seasonFav);
  //       seasonFav.likedSeason.push(this.season);
  //       this.favorites.series[index] = seasonFav;
  //     } else {
  //       seasonFav = {
  //         title: this.item.Title,
  //         id: this.id,
  //         poster: 'http://img.omdbapi.com/?apikey=75522b56&h=600&i=' + this.id,
  //         likedSeason: [this.season],
  //         likedEpisode: []
  //       };
  //       this.favorites.series.push(seasonFav);
  //     }
  //   } else {
  //     this.favorites.series = this.favorites.series.filter((x) => {
  //       return x.id !== this.id;
  //     });
  //   }

  //   this.storage.set('favorites', this.favorites).then(() => this.liked = !this.liked).catch();
  // }
}

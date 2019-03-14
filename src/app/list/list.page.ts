import { StorageProviderService } from './../services/storage-provider.service';
import { Favorites } from './../../../typings/storage.d';
import { ActivatedRoute } from '@angular/router';
import { DataProviderService } from './../services/data-provider.service';
import { Component, OnInit } from '@angular/core';
import { SearchList } from 'typings/api';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  public type: 'movie' | 'series';
  public listItem: SearchList[] = [];
  public listLike: boolean[] = [];
  public error: string = null;
  public showSearch = true;

  public favorites: Favorites;
  private actualTitle = null;
  private actualPage = 1;
  constructor(public dataProvider: DataProviderService, private route: ActivatedRoute, private storage: StorageProviderService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.type = params['type'];
    });

    this.storage.getFavorites().then((x) => {
      this.favorites = x;
    });
  }

  onInput(event) {
    const title = event.target.value;
    this.actualTitle = title;
    // console.log(title);
    if (title !== '') {
      this.dataProvider.ResearchByName(title, this.type).then((x) => {
        if (x.data.Response === 'False') {
          this.error = x.data.Error;
          this.listItem = [];
        } else {
          this.listItem = x.data.Search;
          this.error = null;
        }
        this.actualPage = 1;
        this.checkLikes();
      }).catch((e) => {
        this.error = e.message;
      });
    } else {
      this.listItem = [];
      this.error = null;
      this.actualPage = 1;
    }
  }

  updateSearch() {
    this.showSearch = !this.showSearch;
  }

  setDefaultImage(image) {
    image.target.src = 'assets/img/none.jpg';
  }

  doInfinite(infiniteScroll) {
    this.dataProvider.ResearchByName(this.actualTitle, this.type, ++this.actualPage).then((x) => {

      if (x.data.Response === 'True') {
        this.listItem = this.listItem.concat(x.data.Search);
        this.checkLikes();
      }
      infiniteScroll.target.complete();
    });
  }

  checkLikes() {
    this.listLike = this.listItem.map((item) => this.favorites[this.type].some((x) => x.id === item.imdbID));
  }

}

import { DataProviderService } from './../services/data-provider.service';
import { Component, OnInit } from '@angular/core';
import { SearchList } from 'typings/api';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.page.html',
  styleUrls: ['./movie-list.page.scss'],
})
export class MovieListPage implements OnInit {

  public listItem: SearchList[] = [];
  public error: string = null;
  public showSearch = true;

  private actualTitle = null;
  private actualPage = 1;
  constructor(public dataProvider: DataProviderService) { }

  ngOnInit() {
  }

  onInput(event) {
    const title = event.target.value;
    this.actualTitle = title;
    // console.log(title);
    if (title !== '') {
      this.dataProvider.ResearchByName(title, 'movie').then((x) => {
        if (x.data.Response === 'False') {
          this.error = x.data.Error;
          this.listItem = [];
        } else {
          this.listItem = x.data.Search;
          this.error = null;
        }
        this.actualPage = 1;
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
    this.dataProvider.ResearchByName(this.actualTitle, 'movie', ++this.actualPage).then((x) => {

      if (x.data.Response === 'True') {
        this.listItem = this.listItem.concat(x.data.Search);
      }
      infiniteScroll.target.complete();
    });
  }

}

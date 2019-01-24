import { DataProviderService } from './../services/data-provider.service';
import { Component, OnInit } from '@angular/core';
import { SearchList } from 'typings/api';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.page.html',
  styleUrls: ['./serie-list.page.scss'],
})
export class SerieListPage implements OnInit {

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
    if (title !== '') {
      this.dataProvider.ResearchByName(title, 'series').then((x) => {
        if (x.data.Response === 'False') {
          this.error = x.data.Error;
          this.listItem = [];
        } else {
          this.listItem = x.data.Search;
          this.error = null;
        }
        this.actualPage = 1;
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
    this.dataProvider.ResearchByName(this.actualTitle, 'series', ++this.actualPage).then((x) => {
      if (x.data.Response === 'True') {
        this.listItem = this.listItem.concat(x.data.Search);
      }
      infiniteScroll.target.complete();
    });
  }

}

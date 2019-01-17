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

  constructor(public dataProvider: DataProviderService) { }

  ngOnInit() {
  }

  onInput(event) {
    const title = event.target.value;
    // console.log(title);
    this.dataProvider.ResearchByName(title, 'movie').then((x) => {
      if (x.data.Error) {
        this.error = x.data.Error;
        this.listItem = [];
      } else {
        this.listItem = x.data.Search;
        this.error = null;
      }
    });
  }

}

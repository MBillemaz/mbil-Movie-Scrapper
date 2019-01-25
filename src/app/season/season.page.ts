import { DataProviderService } from './../services/data-provider.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Season } from 'typings/api';

@Component({
  selector: 'app-season',
  templateUrl: './season.page.html',
  styleUrls: ['./season.page.scss'],
})
export class SeasonPage implements OnInit {

  public item: Season;
  public id;
  constructor(public dataProvider: DataProviderService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.dataProvider.getSeason(this.id, params['season']).then((x) => {
        this.item = x.data;
      });
    });
  }

  setDefaultImage(image) {
    image.target.src = 'assets/img/none.jpg';
  }
}

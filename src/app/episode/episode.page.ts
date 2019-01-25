import { EpisodeDetail } from './../../../typings/api.d';
import { DataProviderService } from './../services/data-provider.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Episode } from 'typings/api';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.page.html',
  styleUrls: ['./episode.page.scss'],
})
export class EpisodePage implements OnInit {

  public id;
  public item: EpisodeDetail;

  constructor(public dataProvider: DataProviderService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.dataProvider.getById(this.id).then((x) => {
        this.item = x.data;
      });
    });
  }

  setDefaultImage(image) {
    image.target.src = 'assets/img/none.jpg';
  }

}

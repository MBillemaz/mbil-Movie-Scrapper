import { Data } from './../../../typings/api.d';
import { DataProviderService } from '../services/data-provider.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  public item: Data;
  public type;
  public id;
  private tryPoster = false;

  constructor(public dataProvider: DataProviderService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.type = params['type'];
      this.dataProvider.getById(this.id).then((x) => {
        this.item = x.data;
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

  counter(i: string) {
    return new Array(parseInt(i, 10));
  }

}

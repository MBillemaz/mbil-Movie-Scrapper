import { Movie } from './../../../typings/api.d';
import { DataProviderService } from './../services/data-provider.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {

  public movie: Movie;
  public id;
  private tryPoster = false;

  constructor(public dataProvider: DataProviderService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.dataProvider.getById(this.id).then((x) => {
        this.movie = x.data;
      });
    });
  }

  setDefaultImage(image) {
    if (this.tryPoster) {
      image.target.src = 'assets/img/none.jpg';
    } else {
      image.target.src = this.movie.Poster;
      this.tryPoster = true;
    }

  }

}

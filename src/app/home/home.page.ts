import { MovieListPage } from './../movie-list/movie-list.page';
import { Movie, SearchList } from './../../../typings/api.d';
import { DataProviderService } from '../services/data-provider.service';
import { Component } from '@angular/core';
import { SerieListPage } from '../serie-list/serie-list.page';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor() {

        // dataProvider.getById('tt0848228').then(x => {
        //     console.log(x);
        //     if (x.error) {
        //         this.error = x.error;
        //     } else {
        //         this.movie = x.data;
        //     }

        // });

        // dataProvider.ResearchByName('X-Men', 'movie').then(x => {
        //     console.log(x);
        //     if (x.error) {
        //         this.error = x.error;
        //     } else {
        //         this.movie = x.data;
        //     }

        // });

    }





}

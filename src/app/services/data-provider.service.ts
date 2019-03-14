import { HttpProviderService } from './http-provider.service';
import { MovieRequest, MovieSearch } from '../../../typings/api';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataProviderService {

    private dataLink = 'http://www.omdbapi.com/';

    constructor(private http: HttpProviderService) {

    }

    public getById(id: string) {

        const request: MovieRequest = {
            apikey: '75522b56',
            i: id,
            plot: 'full'
        };

        return this.http.get(this.dataLink, { ...request }, {});
    }

    public getByTitle(title: string) {
        const request: MovieRequest = {
            apikey: '75522b56',
            t: title,
            plot: 'full'
        };

        return this.http.get(this.dataLink, { ...request }, {});
    }

    public ResearchByName(title: string, type: 'movie' | 'series', page?: number) {
        const request: MovieSearch = {
            apikey: '75522b56',
            s: title,
            type: type,
            page: page ? page.toString() : '1'
        };

        console.log(request);
        return this.http.get(this.dataLink, { ...request }, {});
    }

    public getSeason(id: string, season: string) {
        const request: MovieRequest = {
            apikey: '75522b56',
            i: id,
            Season: season
        };

        return this.http.get(this.dataLink, { ...request }, {});
    }
}

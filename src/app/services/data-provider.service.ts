import { HttpProviderService } from './http-provider.service';
import { Platform } from '@ionic/angular';
import { MovieRequest, MovieSearch } from '../../../typings/api';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/Common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataProviderService {

    private dataLink = 'http://www.omdbapi.com/?apikey=75522b56';
    private posterLink = 'http://img.omdbapi.com/?apikey=75522b56';

    constructor(private http: HttpProviderService) {

    }

    public getById(id: string) {

        const request: MovieRequest = {
            i: id
        };

        return this.http.get(this.dataLink, { ...request }, {});
    }

    public getByTitle(title: string) {
        const request: MovieRequest = {
            t: title
        };

        return this.http.get(this.dataLink, { ...request }, {});
    }

    public ResearchByName(title: string, type: 'movie' | 'series' | 'episode') {
        const request: MovieSearch = {
            s: title,
            type: type
        };

        return this.http.get(this.dataLink, { ...request }, {});
    }
}

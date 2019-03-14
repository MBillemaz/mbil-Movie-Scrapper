
export interface MovieRequest {
    apikey: string;
    i?: string;
    t?: string;
    type?: 'movie' | 'series' | 'episode';
    plot?: string;
    y?: string;
    Season?: string,
    Episode?: string
}

export interface MovieSearch {
    apikey: string;
    s: string;
    type?: 'movie' | 'series' | 'episode';
    y?: string;
    page?: string;
}

export interface Season {
    Title: string;
    Season: string;
    totalSeasons: string;
    Episodes: Episode[];
}

export interface Episode {
    Title: string;
    ReleasedEpisode: string;
    imdbRating: string;
    imdbID: string;
}

export interface EpisodeDetail {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Season: string;
    Episode: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    seriesID: string;
    Type: string;
    Response: string;
}

export interface SearchList {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface Data {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    Response: string;
    Website: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    totalSeasons: string;
}
export interface Rating {
    Source: string;
    Value: string;
}
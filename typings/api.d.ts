
export interface MovieRequest {
    i?: string;
    t?: string;
    type?: 'movie' | 'series' | 'episode';
    plot?: string;
    y?: string;
}

export interface MovieSearch {
    s: string;
    type?: 'movie' | 'series' | 'episode';
    y?: string;
    page?: string;
}

export interface Season {
    Title: string;
    Season: string;
    totalSeason: string;
    Episodes: Episode[];
}

export interface Episode {
    Title: string;
    ReleasedEpisode: string;
    imdbRating: string;
    imdbId: string;
}

export interface SearchList {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
}

export interface Movie {
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
    totalSeasons: string;
    DVD:string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
}

export interface Serie {
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
    totalSeasons: string;
    Response: string
}

export interface Rating {
    Source: string;
    Value: string;
}
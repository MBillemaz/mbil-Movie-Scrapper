export interface GlobalStorage {
    favorites: Favorites; 
}

export interface Favorites {
    movie: StoredData[];
    series: StoredData[];
}

export interface StoredData {
    title: String;
    id: String;
    poster: String;
    // likedSeason?: number[];
    likedEpisode?: StoredEpisode[];
}

export interface StoredEpisode {
    title: String;
    id: String;
    episode: String;
    season: String;
}
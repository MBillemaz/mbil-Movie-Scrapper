export interface GlobalStorage {
    favorites: Favorites; 
}

export interface Favorites {
    movie: StoredData[];
    series: StoredData[];
}

export interface StoredData {
    title: string;
    id: string;
    poster: string;
    // likedSeason?: number[];
    likedEpisode?: StoredEpisode[];
}

export interface StoredEpisode {
    title: string;
    id: string;
    episode: string;
    season: string;
}
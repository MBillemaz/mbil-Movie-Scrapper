import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home/list/movie', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'details/:type/:id', loadChildren: './details/details.module#DetailsPageModule' },
  { path: 'season/:id/:season', loadChildren: './season/season.module#SeasonPageModule' },
  { path: 'episode/:id/:title', loadChildren: './episode/episode.module#EpisodePageModule' },
  { path: 'favorites', loadChildren: './favorites/favorites.module#FavoritesPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

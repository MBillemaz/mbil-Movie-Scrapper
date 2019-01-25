import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        children: [
          { path: 'movie-list', loadChildren: '../movie-list/movie-list.module#MovieListPageModule' },
          { path: 'serie-list', loadChildren: '../serie-list/serie-list.module#SerieListPageModule' }
        ]
      },
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule { }

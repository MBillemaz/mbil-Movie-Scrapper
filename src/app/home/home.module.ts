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
          { path: 'list/:type', loadChildren: '../list/list.module#ListPageModule' },
          { path: 'favorites', loadChildren: '../favorites/favorites.module#FavoritesPageModule' },
          { path: 'settings', loadChildren: '../settings/settings.module#SettingsPageModule' },
        ]
      },
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule { }

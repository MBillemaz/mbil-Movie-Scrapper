import { Favorites } from 'typings/storage';
import { DataProviderService } from './../services/data-provider.service';
import { Component, OnInit } from '@angular/core';
import { StorageProviderService } from '../services/storage-provider.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {

  public showSearch = true;
  public favorites: Favorites;
  public type: 'movie' | 'series' = 'movie';

  public title = '';
  public error: string = null;
  public allItems = { movie: [], series: [] };
  public listItem = [];
  public actualPage = 1;

  constructor(public dataProvider: DataProviderService, private storage: StorageProviderService) {
     // Déclenché lors d'un changement de favoris
     this.storage.subject.subscribe((allFav) => {
      this.favorites = allFav;
      const fav = Object.assign({}, allFav);

      // On supprime chaque objet stocké qui n'est plus dans la liste de favoris.
      Object.keys(this.allItems).forEach((type) => {
        this.allItems[type].forEach((item, index) => {
          const actualIndex = fav[type].map((x) => x.title).indexOf(item.Title);
          if (actualIndex === -1) {
            this.allItems[type].splice(index, 1);
            this.listItem.splice(index, 1);
          } else {
            fav[type].splice(actualIndex, 1);
          }
        });
      });
      // On regarde ensuite les favoris qui n'ont pas été traités et on les rajoute dans la liste des objets stockés
      Object.keys(fav).forEach((type) => {
        fav[type].forEach((item) => {
          this.dataProvider.getById(item.id).then((result) => {
            this.allItems[type].push(result.data);
            if (type === this.type) {
              this.listItem.push(result.data);
            }
          }).catch((e) => {
            this.error = e.message;
            this.listItem = null;
          });
        });
      });
    });
  }

  ionViewDidEnter() {
    this.storage.getFavorites().then((x) => {
      this.favorites = x;
      this.allItems = { movie: [], series: [] };
      this.listItem = [];
      Object.keys(this.favorites).forEach((type) => {
        this.favorites[type].forEach((item) => {
          this.dataProvider.getById(item.id).then((result) => {
            this.allItems[type].push(result.data);
            if (type === this.type) {
              this.listItem.push(result.data);
            }
          }).catch((e) => {
            console.error('error', e);
            this.error = e.message;
            this.listItem = null;
          });
        });
      });
    }).catch((e) => {
      console.error(e);
    });
  }

  onInput(event) {
    const title = event.target.value;
    this.title = title;
    if (title !== '') {
      this.listItem = this.allItems[this.type].filter((x) => {
        return x.Title.toLowerCase().includes(title.toLowerCase());
      });
    } else {
      this.listItem = this.allItems[this.type];
    }
  }

  setDefaultImage(image) {
    image.target.src = 'assets/img/none.jpg';
  }

  updateSearch() {
    this.showSearch = !this.showSearch;
  }

  changeType(event) {
    this.type = event.target.checked ? 'series' : 'movie';
    if (this.title !== '') {
      this.listItem = this.allItems[this.type].filter((x) => x.title.includes(this.title));
    } else {
      this.listItem = this.allItems[this.type];
    }
  }
}

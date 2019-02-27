import { Favorites } from './../../../typings/storage.d';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageProviderService {

  constructor(private storage: Storage) { }
  public subject = new Subject<Favorites>();

  getFavorites(): Promise<Favorites> {
    return this.storage.get('favorites');
  }

  get(key: string) {
    return this.storage.get(key);
  }

  set(key: string, val: any) {
    return this.storage.set(key, val).then(() => {
      this.storage.get(key).then((result) => {
        this.subject.next(result);
        return true;
      });
    });
  }

  add(key: string, val: any) {
    return this.storage.get(key).then((x: any[]) => {
      const newArray = [...x, val];
      return this.storage.set(key, newArray);
    });
  }
}

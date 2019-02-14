import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageProviderService {

  constructor(private storage: Storage) { }

  getFavorites() {
    return this.storage.get('favorites');
  }

  get(key: string) {
    return this.storage.get(key);
  }

  set(key: string, val: any) {
    return this.storage.set(key, val);
  }

  add(key: string, val: any) {
    return this.storage.get(key).then((x: any[]) => {
      const newArray = [...x, val];
      return this.storage.set(key, newArray);
    });
  }
}

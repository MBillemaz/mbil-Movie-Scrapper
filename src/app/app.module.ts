import { HTTP } from '@ionic-native/http/ngx';
import { HttpProviderService } from './services/http-provider.service';
import { DataProviderService } from './services/data-provider.service';
import { StorageProviderService } from './services/storage-provider.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicStorageModule } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), IonicStorageModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DataProviderService,
    HttpProviderService,
    StorageProviderService,
    HTTP
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private storage: StorageProviderService) {
    storage.getFavorites().then((x) => {
      if (!x) {
        storage.set('favorites', {
          movie: [],
          series: []
        });
      }
    });
  }
}

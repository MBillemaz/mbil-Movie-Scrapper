import { Platform } from '@ionic/angular';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  private isNative: boolean;
  constructor(private ptl: Platform, private angHttp: HttpClient, private nativeHttp: HTTP) {
    this.isNative = ptl.is('cordova') ? true : false;
  }

  get(url: string, params: { [key: string]: string }, headers: { [key: string]: string }): Promise<HTTPResponse> {
    if (this.isNative) {
      return this.nativeHttp.get(url, params, headers).then((x) => {
        return {
          data: JSON.parse(x.data),
          status: x.status,
          url: x.url,
          headers: x.headers,
          error: x.error
        };
      });
    } else {

      return this.angHttp.get<Object>(url, {
        params,
        headers,
        observe: 'response'
      }).toPromise().then((x: HttpResponse<Object>) => {
        return {
          data: x.body,
          error: x.status !== 200 ? x.statusText : null,
          headers: x.headers,
          status: x.status,
          url: x.url
        };
      });
    }
  }
}

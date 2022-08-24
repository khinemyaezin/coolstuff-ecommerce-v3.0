import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, forkJoin, lastValueFrom, catchError, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  private CONFIG: any;
  private SYSTEM: any;

  constructor(private http: HttpClient, private auth: AuthService,private router:Router) {}

  init() {
    return new Promise<void>((res, rej) => {
      const config = this.http.get('/assets/config/config.json');
      const system = this.http.get('/assets/config/system.json');
      //console.log(config);

      lastValueFrom(forkJoin([config, system]))
        .catch((error) => {
          
        })
        .then((next: any) => {
          this.CONFIG = next[0];
          this.SYSTEM = next[1];

          this.GET('sessions/user').subscribe({
            next: (body: any) => {
              this.auth.signin(body.details);
              res();
            },
            error: (err) => {
              console.log(err);
              this.router.navigateByUrl('/');
              res();
            },
          });
        });

      // Success configuration;
    });
  }

  GET(url: string, callback?: Function, reqParam?: HttpParams) {
    const myurl = this.CONFIG?.url + url;
    const options: {
      headers?: HttpHeaders;
      params?: HttpParams;
    } = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      params: reqParam,
    };
    return this.http
      .get(myurl, {
        ...options,
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map((resp) => {
          return resp.body;
        }),
        catchError((err) => {
          throw 'error in source. Details: ' + err;
        })
      );
  }

  POST(url: string, body: any, callback?: Function, reqParam?: HttpParams) {
    const myurl = this.CONFIG?.url + url;
    const options: {
      headers?: HttpHeaders;
      params?: HttpParams;
    } = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      params: reqParam,
    };
    return this.http
      .post(myurl, body, {
        ...options,
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map((resp: HttpResponse<any>) => {
          return resp.body;
        }),
        catchError((err) => {
          throw 'error in source. Details: ' + err;
        })
      );
  }

  PUT(url: string, body: any, callback?: Function, reqParam?: HttpParams) {
    const myurl = this.CONFIG?.url + url;
    const options: {
      headers?: HttpHeaders;
      params?: HttpParams;
    } = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      params: reqParam,
    };
    return this.http
      .put(myurl, body, {
        ...options,
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map((resp) => {
          return resp.body;
        }),
        catchError((err) => {
          throw 'error in source. Details: ' + err;
        })
      );
  }

  fetch(url: string): Observable<any> {
    const myurl = url;
    const options: {
      headers?: HttpHeaders;
      params?: HttpParams;
    } = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .get(myurl, {
        ...options,
        withCredentials: true,
        observe: 'response',
      })
      .pipe(
        map((resp) => {
          return resp.body;
        }),
        catchError((err) => {
          throw 'error in source. Details: ' + err;
        })
      );
  }
}
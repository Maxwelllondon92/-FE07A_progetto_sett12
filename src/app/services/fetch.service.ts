import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Favorite, Movie } from '../models/movie.model';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  url: string = 'http://localhost:4201';
  user = this.authSrv.user;

  constructor(private http: HttpClient, private authSrv: AuthService) {
  }

  fetchPopular() {
    return this.authSrv.user.pipe(
      take(1),
      exhaustMap(() => {
        return this.http.get<Movie[]>(this.url + '/movies-popular');
      })
    );
  }
  fetchTopRated() {
    return this.authSrv.user.pipe(
      take(1),
      exhaustMap(() => {
        return this.http.get<Movie[]>(this.url + '/movies-toprated');
      })
    );
  }
  fetchFavorites() {
    return this.authSrv.user.pipe(
      exhaustMap(() => {
        return this.http.get<Favorite[]>(
          this.url + '/favorites/?userId=' + this.authSrv.userId
        );
      })
    );
  }
  addFav(movieId: number) {
    let newFav ={
      "movieId": movieId,
      "userId": this.authSrv.userId
    }
    this.http.post(this.url + '/favorites', newFav).subscribe();
  }
  delFav(favIndex: number) {
    this.http.delete(this.url + '/favorites/'+favIndex).subscribe();
  }
}

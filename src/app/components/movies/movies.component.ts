import { Component, OnInit } from '@angular/core';
import { Favorite, Movie } from 'src/app/models/movie.model';
import { AuthService } from 'src/app/services/auth.service';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  topRated!: Movie[];
  popular!: Movie[];
  favorites!: Favorite[];
  favoritesIds: number[] = [];
  posterUrl: string = 'http://image.tmdb.org/t/p/w500';
  isFetching: boolean = false;
  isFetchingFavs: boolean = false;

  constructor(private fetch: FetchService,private authSrv:AuthService) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.fetch.fetchTopRated().subscribe((movies) => {
      this.topRated = movies;
      this.isFetching = false;
    });
    this.fetch.fetchPopular().subscribe((movies) => {
      this.popular = movies;
      this.isFetching = false;
    });
    this.fetchFavorites();
  }
  fetchFavorites() {
    this.fetch.fetchFavorites().subscribe((movies) => {
      this.favorites = movies;
      this.favoritesIds = [];
      for (let i in movies) {
        this.favoritesIds.push(movies[i].movieId);
      }
      this.isFetchingFavs=false
    });

  }
  toggleFav(tagId: number) {
    this.isFetchingFavs=true;
    if (this.favoritesIds.includes(tagId)) {
      let favId: Favorite | undefined = this.favorites.find((obj) => {
        return obj.movieId === tagId&&obj.userId===this.authSrv.userId;
      });
      if (favId) {
        this.fetch.delFav(favId.id);
      }
    } else {
      this.fetch.addFav(tagId);
    }
    this.fetchFavorites();
  }
}

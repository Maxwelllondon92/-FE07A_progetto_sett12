import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { AuthData, User } from '../models/user.model';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'http://localhost:4201';
  user = new ReplaySubject<User>();
  userId!: number;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {
    let userData: User = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!isNaN(userData.id)) {
      this.userId = userData.id;
      console.log(this.userId);
    }
  }

  signup(user: any) {
    return this.http.post<AuthData>(this.url + '/signup', user).pipe(
      tap((response) => {
        this.handleAuthentication(
          response.user.username,
          response.user.email,
          response.user.id,
          response.accessToken,
          3600
        );
        this.logout(true);
      })
    );
  }
  login(user: any) {
    return this.http.post<AuthData>(this.url + '/login', user).pipe(
      tap((response) => {
        this.handleAuthentication(
          response.user.username,
          response.user.email,
          response.user.id,
          response.accessToken,
          3600
        );
        let userData: User = JSON.parse(localStorage.getItem('userData') || '');
        this.userId = userData.id;
      })
    );
  }
  logout(forced: boolean) {
    this.user.next();
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    console.clear();
    if (forced) {
      console.info('Utente sloggato su richiesta del sistema');
    } else {
      console.info("Utente sloggato su richiesta dell'utente");
    }
    this.userId = 0;
  }
  autoLogin() {
    let userData: {
      username: string;
      email: string;
      id: number;
      _token: string;
      _tokenEx: Date;
    };
    let loadedUser;
    const storagePath = localStorage.getItem('userData');
    if (storagePath) {
      userData = JSON.parse(storagePath);
      loadedUser = new User(
        userData.username,
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenEx)
      );
      if (loadedUser.token) {
        this.user.next(loadedUser);
        const expirationDuration =
          new Date(userData._tokenEx).getTime() - new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    } else {
      return;
    }
  }
  autoLogout(expirationDuration: number) {
    console.info(
      'Logout automatico tra ' + expirationDuration / 1000 + ' secondi.'
    );
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout(true);
    }, expirationDuration);
  }
  private handleAuthentication(
    username: string,
    email: string,
    id: number,
    token: string,
    tokenEx: number
  ) {
    const expirationDate = new Date(new Date().getTime() + tokenEx * 1000);
    const user = new User(username, email, id, token, expirationDate);
    this.user.next(user);
    this.autoLogout(tokenEx * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}

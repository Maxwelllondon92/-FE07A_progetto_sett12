import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'movies';
  constructor(private authSrv:AuthService){

  }
  ngOnInit(): void {
      this.authSrv.autoLogin()
  }
}

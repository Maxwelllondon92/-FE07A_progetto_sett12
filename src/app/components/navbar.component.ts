import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
    <mat-toolbar color="primary" class="sticky-top">
      <span>MovieBrand</span>
      <div>
        <a routerLink="/" *ngIf="isAuthenticated">Movies</a>
        <a routerLink="/profile" *ngIf="isAuthenticated">Profilo</a>
        <a routerLink="/login" *ngIf="!isAuthenticated">Accedi</a>
        <a routerLink="/register" *ngIf="!isAuthenticated">Registrati</a>
        <a href="javascript:void(0)" *ngIf="isAuthenticated" (click)="onLogout()">Esci</a>
      </div>
    </mat-toolbar>
  `,
  styles: [
    `
      div {
        margin-left: auto;
      }
      a {
        color: white;
        text-decoration: none;
        margin-right: 1.5rem;
      }
    `,
  ],
})
export class NavbarComponent implements OnInit,OnDestroy {
  isAuthenticated:boolean=false;
  private userSub!: Subscription;
  constructor(private AuthSrv: AuthService) {}
  onLogout(){
    this.AuthSrv.logout(false);
  }
  ngOnInit(): void {
    this.userSub = this.AuthSrv.user.subscribe(user=>{
      this.isAuthenticated = user? true:false
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}

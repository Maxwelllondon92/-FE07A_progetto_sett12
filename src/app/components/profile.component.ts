import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-profile',
  template: `
    <div class="container mt-3">
      <p>Ciao, {{userData.username}}</p>
      <p>Email: {{userData.email}}</p>
    </div>
  `,
  styles: [
  ]
})
export class ProfileComponent implements OnInit {
  userData!:User

  constructor() { }

  ngOnInit(): void {
    let userData=localStorage.getItem('userData')
    if(userData){
      this.userData=JSON.parse(userData)
    }
  }

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth-components/login.component';
import { RegisterComponent } from './components/auth-components/register.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ProfileComponent } from './components/profile.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'/movies',pathMatch:'full'},
  {path:'movies',component:MoviesComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile',component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

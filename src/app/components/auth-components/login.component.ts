import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./auth.components.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router:Router,private auth:AuthService) {}
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  isLoading:boolean=false;
  error:string|null=null;

  getEmailErrorMessage() {
    if (this.loginForm.hasError('required','email')) {
      return 'Il campo non può essere vuoto';
    }
    return this.loginForm.hasError('email','email') ? 'Email non valida' : '';
  }
  getPasswordErrorMessage() {
    if (this.loginForm.hasError('required','password')) {
      return 'Il campo non può essere vuoto';
    }
    return this.loginForm.hasError('minlength','password') ? 'La password deve essere di almeno 6 caratteri' : '';
  }
  onSubmit(){
    if (this.loginForm.invalid){
      return;
    }
    this.isLoading=true
    this.auth.login(this.loginForm.value).subscribe(response=>{
      this.isLoading=false;
      this.router.navigate(['/movies']);
    },error=>{
      this.error=error.error;
      this.isLoading=false;
    })
  }
  ngOnInit(): void {}
}

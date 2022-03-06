import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./auth.components.scss'],
})
export class RegisterComponent implements OnInit {
  signupForm = new FormGroup({
    username: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  isLoading:boolean=false;
  error:string|null=null;

  constructor(private router:Router,private auth:AuthService) {}

  getEmailErrorMessage() {
    if (this.signupForm.hasError('required','email')) {
      return 'Il campo non può essere vuoto';
    }
    return this.signupForm.hasError('email','email') ? 'Email non valida' : '';
  }
  getPasswordErrorMessage() {
    if (this.signupForm.hasError('required','password')) {
      return 'Il campo non può essere vuoto';
    }
    return this.signupForm.hasError('minlength','password')
      ? 'La password deve essere di almeno 6 caratteri'
      : '';
  }
  getUsernameErrorMessage() {
    if (this.signupForm.hasError('required','username')) {
      return 'Il campo non può essere vuoto';
    }
    return this.signupForm.hasError('minlength','username')
      ? 'Il nome utente deve essere di almeno 3 caratteri'
      : '';
  }
  onSubmit() {
    if (this.signupForm.invalid){
      return;
    }
    this.isLoading=true
    this.auth.signup(this.signupForm.value).subscribe(response=>{
      this.isLoading=false;
      this.router.navigate(['login']);
    },error=>{
      this.error=error.error;
      this.isLoading=false;
    })
  }
  ngOnInit(): void {}
}

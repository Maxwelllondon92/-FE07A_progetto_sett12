import { Injectable } from '@angular/core';
import { HttpHeaders, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authSrv:AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    if(req.url==this.authSrv.url+"/login"||req.url==this.authSrv.url+"/signup"){
      return next.handle(req)
    }
    return this.authSrv.user.pipe(
      take(1),
      exhaustMap((user) => {
        const superReq = req.clone({headers:new HttpHeaders({
          'Authorization':`Bearer ${user.token}`
        })})
        return next.handle(superReq)
      }))
  }
}

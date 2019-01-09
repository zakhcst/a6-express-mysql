import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  // constructor(private injector: Injector, private _auth: AuthService) {}
  constructor(private injector: Injector) {}

  intercept(req, next) {
    const authService = this.injector.get(AuthService);
    const token = authService.getToken();
    const tokenizedReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + token
        // 'Bearer ' + token
        )
    });
    return next.handle(tokenizedReq);
  }
}

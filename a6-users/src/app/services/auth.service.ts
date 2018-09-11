import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoginService } from './user-login.service';
import { UserDetailsService } from './user-details.service';
import { LoggedUser } from '../models/models.user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user: LoggedUser;
  public userSubject$ = new BehaviorSubject(null);

  constructor(
    private _router: Router,
    private _login: LoginService,
    private _userDetails: UserDetailsService
  ) {
    console.log('AuthService constructor');
    if (this.loggedIn()) {
      this.refreshUserDetails();
    } else {
      this.user = null;
    }
  }

  // Refresh user details when user has been logged in
  // and token has not expired
  // and on reload (F5/Ctrl-R)
  refreshUserDetails() {
    console.log('AuthService refreshUserDetails');
    const userDetailsSubscription = this._userDetails.userDetails$.subscribe(
      data => {
        this.user = data;
        this.user.sessionExp = Number(localStorage.getItem('token_expires_at'));
        this.userSubject$.next(this.user);
        userDetailsSubscription.unsubscribe();
      }
    );
  }

  loginUser(userLoginCredentials) {
    return this._login.loginUser(userLoginCredentials).pipe(
      tap(data => {
        this.setSession(data);
        this.userSubject$.next(this.user);
      })
    );
  }

  private setSession(authResult: LoggedUser) {
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('token_expires_at', String(authResult.sessionExp));
    this.user = authResult;
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expires_at');
    if (this.user) {
      this.user = null;
      this.userSubject$.next(this.user);
      console.log('User logged out');
      this._router.navigate(['']);
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return (
      this.getToken() &&
      Date.now() < parseInt(localStorage.getItem('token_expires_at') || '0', 10)
    );
  }
}

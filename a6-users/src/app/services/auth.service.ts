import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoginService } from './user-login.service';
import { UserDetailsService } from './user-details.service';
import { User } from '../models/models.user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: User = null;
  public userSubject$ = new BehaviorSubject<User>(null);

  constructor(
    private _router: Router,
    private _login: LoginService,
    private _userDetails: UserDetailsService
  ) {
    if (this.loggedIn() && !this.user) {
      this.refreshUserDetails();
    }
  }

  // Refresh user details when user has been logged in
  // and token has not expired
  // and on reload (F5/Ctrl-R)
  refreshUserDetails() {
    console.log('AuthService refreshUserDetails');
    // const userDetailsSubscription = this._userDetails
    this._userDetails
      .getUserDetails(this.getUserId())
      .subscribe((data: User) => {
        this.user = data;
        this.user.sessionExp = Number(localStorage.getItem('token_expires_at'));
        this.userSubject$.next(this.user);
        // userDetailsSubscription.unsubscribe();
      }).unsubscribe();
  }

  loginUser(userLoginCredentials) {
    return this._login.loginUser(userLoginCredentials).pipe(
      tap(data => {
        this.setSession(data);
        // this.userSubject$.next(this.user);
        this.userSubject$.next(data);
      })
    );
  }

  setSession(authResult: User) {
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('token_expires_at', String(authResult.sessionExp));
    localStorage.setItem('id', String(authResult.id));
    this.user = authResult;
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expires_at');
    localStorage.removeItem('id');
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
  getUserId() {
    return localStorage.getItem('id');
  }

  loggedIn() {
    return (
      this.getToken() &&
      Date.now() < parseInt(localStorage.getItem('token_expires_at') || '0', 10)
    );
  }
}

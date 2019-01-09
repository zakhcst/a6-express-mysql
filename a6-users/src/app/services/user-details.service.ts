import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndPoints } from '../api-end-points/user/user.endpoints';
// import { Observable } from 'rxjs';
import { retry, share } from 'rxjs/operators';
// import { User } from '../models/models.user';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  // userDetails$: Observable<User> = null;

  constructor(private _http: HttpClient, private _api: ApiEndPoints) {
    // this.userDetails$ = this._http
    //   .get<User>(this._api.getLoggedUserDetailsUrl)
    //   .pipe(share());
  }
  getUserDetails(id) {
    return this._http
      .get<any>(this._api.getUserUrl + '/' + id)
      .pipe(retry(2), share());
  }
}

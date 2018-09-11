import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndPoints } from '../api-end-points/user/user.endpoints';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { LoggedUser } from '../models/models.user';

@Injectable({
  providedIn: 'root'
})

export class UserDetailsService {

  public userDetails$: Observable<LoggedUser> = null;

    constructor(private _http: HttpClient, private _api: ApiEndPoints) {
      this.userDetails$ = this._http.get<any>(this._api.getUserDetailsUrl).pipe(share());
    }
}

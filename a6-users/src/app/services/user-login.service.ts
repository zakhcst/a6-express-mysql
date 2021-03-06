import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndPoints } from '../api-end-points/user/user.endpoints';
import { User } from '../models/models.user';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
    constructor(private _http: HttpClient, private _api: ApiEndPoints) {}

    loginUser(userLoginCredentials) {
        return this._http.post<User>(this._api.loginUrl, userLoginCredentials);
      }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndPoints } from '../api-end-points/user/user.endpoints';
import { LoggedUser } from '../models/models.user';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {
    constructor(private _http: HttpClient, private _api: ApiEndPoints) {}

    user(userUpdateDetails) {
        return this._http.post<LoggedUser>(this._api.registerUrl, userUpdateDetails);
      }

}

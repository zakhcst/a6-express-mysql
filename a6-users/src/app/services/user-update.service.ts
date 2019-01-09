import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndPoints } from '../api-end-points/user/user.endpoints';

@Injectable({
  providedIn: 'root'
})

export class UserUpdateService {
    constructor(private _http: HttpClient, private _api: ApiEndPoints) {}

    updateUserDetails(userData) {
      console.log('UserUpdateService', userData);
        return this._http.post<any>(this._api.updateUserUrl, userData);
    }

}

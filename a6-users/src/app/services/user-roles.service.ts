import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndPoints } from '../api-end-points/user/user.endpoints';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserRolesService {

  userRoles$: Observable<any> = null;

    constructor(private _http: HttpClient, private _api: ApiEndPoints) {
      this.userRoles$ = this._http.get<any>(this._api.getUserRolesUrl).pipe(share());
    }
}

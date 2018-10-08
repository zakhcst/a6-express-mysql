import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndPoints } from '../api-end-points/user/user.endpoints';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { User } from '../models/models.user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // users$: Observable<any> = null;
  users$: Observable<User[]> = null;

  constructor(private _http: HttpClient, private _api: ApiEndPoints) {
    this.users$ = this._http.get<User[]>(this._api.getUsersUrl).pipe(share());
  }
}

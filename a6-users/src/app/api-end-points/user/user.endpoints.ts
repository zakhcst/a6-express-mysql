import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiEndPoints {
    loginUrl = '/api/login';
    registerUrl = '/api/register';
    updateUserUrl = '/api/update';
    getUserUrl = '/api/user';
    getUsersUrl = '/api/users';
    getLoggedUserDetailsUrl = '/api/loggedUserDetails';
    getUserRolesUrl = '/api/usersroles';
}

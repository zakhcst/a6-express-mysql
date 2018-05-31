import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiEndPoints {
    loginUrl = '/api/login';
    registerUrl = '/api/register';
    updateUserUrl = '/api/update';
    getUsersUrl = '/api/users';
    getUserDetailsUrl = '/api/userDetails';
    getUserRolesUrl = '/api/usersroles';
}

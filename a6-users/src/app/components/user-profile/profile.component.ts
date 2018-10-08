import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserRolesService } from '../../services/user-roles.service';
import { UserUpdateService } from '../../services/user-update.service';
import { User } from '../../models/models.user';
import { UserRoles } from '../../models/models.user-roles';
import { Subscription, of, Observable } from 'rxjs';
import { filter, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userData: User;
  userDataBeforeUpdate: User;
  userRoles$: Observable<UserRoles[]>;
  subjectSubscribed: Subscription;
  isLoading: Boolean = false;

  constructor (
    private _authService: AuthService,
    private _userRolesService: UserRolesService,
    private _userUpdate: UserUpdateService
  ) {
    console.log('constructor UserProfileComponent');
    this.userRoles$ = _userRolesService.userRoles$;
    this.isLoading = true;
  }

  ngOnInit() {
    // Init case when not subscribed yet
    this.subjectSubscribed = this._authService.userSubject$
      .pipe(filter(user => user)) // user != null
      .subscribe((user: User) => {
        this.isLoading = false;
        this.userData = user;
        this.userDataBeforeUpdate = {...user};
      });
  }

  validateNewData() {
    return (
      this.userData.name &&
      this.userData.name !== '' &&
      this.userData.email &&
      this.userData.email !== '' &&
      (this.userDataBeforeUpdate.name !== this.userData.name ||
        this.userDataBeforeUpdate.email !== this.userData.email ||
        this.userDataBeforeUpdate.role !== this.userData.role)
    );
  }

  updateUserDetails() {
    if (!this.validateNewData()) {
      window.alert('Details were not changed');
      return;
    }
    const user = { ...this.userData,
      nameBeforeUpdate: this.userDataBeforeUpdate.name,
      roleBeforeUpdate: this.userDataBeforeUpdate.role
    };
    this._userUpdate
      .updateUserDetails(user)
      .pipe(catchError(error => of(error)))
      .subscribe(res => {
        if (res.status === 409 && res.error.affectedRows === 0) {
          // reload new details
          window.alert('Details were updated by another user');
        }
        this.ngOnInit();
      });
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AuthService } from '../../services/auth.service';
import { UserRolesService } from '../../services/user-roles.service';
import { UserUpdateService } from '../../services/user-update.service';
import { User } from '../../models/models.user';
import { UserRoles } from '../../models/models.user-roles';
import { Subscription, of, Observable } from 'rxjs';
import { filter, catchError, switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserDetailsService } from '../../services/user-details.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  existing: User;
  updating: User;
  userRoles$: Observable<UserRoles[]>;
  // subjectSubscribed: Subscription;
  isLoading: Boolean = false;

  constructor(
    // private _authService: AuthService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userDetails: UserDetailsService,
    private _userRolesService: UserRolesService,
    private _userUpdate: UserUpdateService
  ) {
    console.log('constructor UserProfileComponent');
    this.userRoles$ = _userRolesService.userRoles$;
    this.isLoading = true;

    // logged user only
    // this.subjectSubscribed = this._authService.userSubject$
    //   .pipe(filter(user => !!user)) // user != null
    //   .subscribe((user: User) => {
    //     this.existing = user;
    //     this.updating = {...user};
    //     this.isLoading = false;
    //   });

    this._route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this._userDetails.getUserDetails(params.get('id'))
        )
      )
      .subscribe(
        data => {
          console.log('data')
          console.log(data)
          this.existing = data;
          this.updating = { ...data };
          console.log(this.existing)
          console.log(this.updating)
          this.isLoading = false;
        },
        e => {
          this.isLoading = false;
          window.alert('ERR');
          this._router.navigate(['/']);
        }
      );
  }

  ngOnInit() {}
  ngOnDestroy() {
  //   this.subjectSubscribed.unsubscribe();
  }

  validateNewData() {
    return (
      this.updating.name &&
      this.updating.name !== '' &&
      this.updating.email &&
      this.updating.email !== '' &&
      (this.existing.name !== this.updating.name ||
        this.existing.email !== this.updating.email ||
        this.existing.roleId !== this.updating.roleId)
    );
  }

  updateUserDetails() {
    if (!this.validateNewData()) {
      window.alert('No changed details');
      return;
    }
    const update = { existing: this.existing, updating: this.updating };
    this._userUpdate
      .updateUserDetails(update)
      .subscribe(res => {
        if (res.status === 409 && res.error.affectedRows === 0) {
          window.alert('Details were updated by another user');
        }
      },
      e => {
        window.alert(e);
      }).unsubscribe();
  }
}

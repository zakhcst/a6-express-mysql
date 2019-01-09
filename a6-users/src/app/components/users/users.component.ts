import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UserUpdateService } from '../../services/user-update.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/models.user';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { Observable, Subscription, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  loggedUser$: Observable<User>;
  usersSubscription: Subscription;
  userUpdate: Subscription;
  displayedColumns = [
    'id',
    'name',
    'email',
    'role',
    'created',
    'changed',
    'active',
    'activate'
  ];
  data: Observable<User>;
  dataSource: MatTableDataSource<User>;
  isLoading = false;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private _users: UsersService,
    private _authService: AuthService,
    private _router: Router,
    private _userUpdate: UserUpdateService
  ) {
    this.loggedUser$ = this._authService.userSubject$;
    this.getUsersData();
  }

  getUsersData() {
    this.isLoading = true;
    this.usersSubscription = this._users.users$.subscribe(data => {
    // this._users.users$.subscribe(data => {
      this.dataSource = new MatTableDataSource<User>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
      this.usersSubscription.unsubscribe();
    })
    // .unsubscribe();
  }

  ngOnInit() {}
  ngOnDestroy() {}

  toggleUser(user) {
    console.log('Toggle user', user);
    console.log('Toggle user', user.active);
    this._userUpdate
      .updateUserDetails({
        existing: { ...user },
        updating: { ...user, active: !user.active }
      })
      .subscribe(
        res => {
          this.getUsersData();
          window.alert('OK:');
          window.alert(res);
        },
        catchError(e => {
          if (e.status === 409 && e.error.affectedRows === 0) {
            window.alert('Details were updated by another user');
          }
          window.alert('Err:');
          this.getUsersData();
          return of(e);
        })
      );
  }

  clickedRow(user) {
    console.log(user);
    this._router.navigate(['/user-profile', user.id]);
  }

  myTrackById(id) {
    return id;
  }
}

import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/models.user';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  loggedUser$: Observable<User>;
  displayedColumns = [
    'id',
    'name',
    'email',
    'role',
    'created',
    'enabled',
    'changed',
    'disable'
  ];
  dataSource: MatTableDataSource<User> = null;
  isLoading = false;

  constructor(
    private _users: UsersService,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.isLoading = true;
    const usersSubscription = _users.users$.subscribe(data => {
      this.dataSource = new MatTableDataSource<User>(data);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false;
    });
    this.loggedUser$ = _authService.userSubject$;
  }

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  ngOnInit() {}

  toggleUser(user) {
    console.log('Toggle user', user);
    console.log('Logged user');
    console.log(this.loggedUser$.subscribe());
    // console.log('Toggle user', this.dataSource);
  }
  clickedRow(row) {
    console.log('clickedRow:', row);
    this._router.navigate(['/']);
  }
}

import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../services/users.service';
import { LoggedUser } from '../../models/models.user';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})


export class UsersComponent implements OnInit {

  displayedColumns = ['id', 'name', 'email', 'role', 'created', 'enabled', 'changed', 'disable'];
  dataSource;
  isLoading = false;

  constructor(private _users: UsersService) {
      this.isLoading = true;
      const usersSubscription = _users.users$.subscribe(data => {
        this.dataSource = new MatTableDataSource<LoggedUser>(data);
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      });

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {}

  deleteUser(userId) {
    console.log('Delete user', userId);
  }
  clickedRow(row) {
    console.log('clickedRow:', row);

  }

}

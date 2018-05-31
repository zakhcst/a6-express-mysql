import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {};

  constructor(private _auth: AuthService,
              private _router: Router) {}

  ngOnInit() {}

  loginUser () {
    // To do: Show incomlete form error
    if (!this.loginUserData['email'] || !this.loginUserData['password']) {
      return;
    }

    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        this._router.navigate(['/']);
      },
      err => console.log(err)
    );
  }
}

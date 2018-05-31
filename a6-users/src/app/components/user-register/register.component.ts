import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/user-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // private _registerUrl = 'api/register';
  registerUserData = {};

  constructor(private _router: Router, private _register: RegisterService) {}

  ngOnInit() {}

  registerUser() {
    // To do: Show incomlete form error
    if (
      !this.registerUserData['name'] ||
      !this.registerUserData['email'] ||
      !this.registerUserData['password']
    ) {
      return;
    }

    return this._register.user(this.registerUserData).subscribe(
      res => {
        this._router.navigate(['/']);
      },
      // To do: Show error popup
      err => console.log(err)
    );
  }
}

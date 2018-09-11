import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { interval, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { LoggedUser } from './models/models.user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  userName = null;
  tickerGenerator$ = interval(1000);
  tickerSubscribed: Subscription;
  subjectSubscribed: Subscription;
  countDown = new Subject();
  constructor(private _authService: AuthService, private _router: Router) {
    console.log('constructor AppComponent');
  }

  ngOnInit() {
    // Init case when not subscribed yet
    if (!this.subjectSubscribed) {
      this.subjectSubscribed = this._authService.userSubject$
        .pipe(distinctUntilChanged())
        .subscribe((user: LoggedUser | null) => {
          if (
            user &&
            (!this.tickerSubscribed ||
              (this.tickerSubscribed && this.tickerSubscribed.closed))
          ) {
            this.tickerSubscribed = this.tickerGenerator$.subscribe(() => {
              const remainingTime = user.sessionExp - Date.now();
              if (remainingTime <= 0) {
                this.tickerSubscribed.unsubscribe();
                this.userName = null;
                this._authService.logoutUser();
              } else {
                this.countDown.next(remainingTime);
                this.userName = user.name;
              }
            });
          } else {
            if (
              !user &&
              this.tickerSubscribed &&
              !this.tickerSubscribed.closed
            ) {
              this.tickerSubscribed.unsubscribe();
              this.userName = null;
              this._authService.logoutUser();
            }
          }
        });
    }
  }
  ngOnDestroy() {
    this.tickerSubscribed.unsubscribe();
    this.subjectSubscribed.unsubscribe();
  }
}

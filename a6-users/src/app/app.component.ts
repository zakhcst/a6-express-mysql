import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { interval, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { User } from './models/models.user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  userName = null;
  auth: any;
  tickerGenerator$ = interval(1000);
  tickerSubscribed: Subscription;
  subjectSubscribed: Subscription;
  countDown = new Subject();

  constructor(private _authService: AuthService) {
    console.log('constructor AppComponent');
    this.auth = _authService;
  }

  ngOnInit() {
    console.log('ngOnInit AppComponent');
    // Init when not subscribed yet
    // Logs out logged user when token session time has expired
    // Manage ticher subscription every second until token session time has expired
    if (!this.subjectSubscribed) {
      this.subjectSubscribed = this.auth.userSubject$
      .pipe(distinctUntilChanged())
      .subscribe((user: User) => {
        console.log('ngOnInit AppComponent .subscribe');
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
                this.auth.logoutUser();
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
              this.auth.logoutUser();
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

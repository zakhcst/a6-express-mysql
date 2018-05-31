import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { HomeComponent} from './components/home/home.component';
import { RegisterComponent} from './components/user-register/register.component';
import { LoginComponent } from './components/user-login/login.component';
import { UsersComponent } from './components/users/users.component';
import { UserProfileComponent } from './components/user-profile/profile.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: UsersComponent
  },
  {
    path: 'user-profile',
    canActivate: [AuthGuard],
    component: UserProfileComponent
  },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [
  HomeComponent,
  RegisterComponent,
  LoginComponent,
  UsersComponent,
  UserProfileComponent
];

import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './modules/users/register/register.component';
import {LoginComponent} from './modules/users/login/login.component';
import {AuthGuard} from './core/guards/auth.guard';
import {DashboardComponent} from './modules/dashboard/dashboard.component';

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

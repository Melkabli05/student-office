import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { routesPath } from "./utils/routesPath";
import {NotFoundComponent} from "../../shared/components/not-found/not-found.component";


const routes: Routes = [
  { path: '', redirectTo: routesPath.login, pathMatch: 'full'},
  { path: routesPath.login, component: LoginComponent },
  { path: routesPath.register, component: RegisterComponent },
  { path: routesPath.forgotPassword, component: ForgotPasswordComponent },
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGaurdService } from './shared/services/auth-gaurd.service';
import { LoginComponent } from './register-login/login/login.component';
import { RegisterComponent } from './register-login/register/register.component';

const routes: Routes = [
  { path: "", redirectTo: 'login', pathMatch: "full" },
  { path: 'login', loadChildren: () => import('./register-login/register-login--routing.module').then(m => m.RegisterLoginRoutingModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGaurdService] },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [AuthGaurdService] },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

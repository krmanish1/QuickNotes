import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'contact',
        component: ContactusComponent
      },
      // Add more child routes here
    ]
  },
  // {
  //   path: 'register-login',
  //   loadChildren: () => import('../register-login/register-login.module').then(m => m.RegisterLoginModule)
  // },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }

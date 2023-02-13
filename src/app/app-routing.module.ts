import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"login", component:LoginPageComponent},
  {path:"signup", component:SignupPageComponent},
  {path:"home", component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

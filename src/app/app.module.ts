import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { SearchFilterPipe } from './controller/search-filter.pipe';
import { AlertComponent } from './alert';
import { SortFilterPipe } from './controller/sort-filter.pipe';
import { UserListComponent } from './components/account/user-list/user-list.component';
import { SortTypePipe } from './controller/sort-type.pipe';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomeComponent,
    SignupPageComponent,
    SearchFilterPipe,
    AlertComponent,
    SortFilterPipe,
    UserListComponent,
    SortTypePipe,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

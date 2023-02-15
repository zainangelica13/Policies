import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApicallService } from 'src/app/services/apicall.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public jsonData: any;
  public deviceArray: any;
  public isTrue: any;

  constructor(private _route:Router, private http: HttpClient, private appService: ApicallService) {
    if(this.appService.userName && this.appService.userEmail && this.appService.userID) {
			this._route.navigate(["home"]);
		}
  }
  
  login:FormGroup|any;

  ngOnInit() {
    this.login = new FormGroup({
      'email': new FormControl(),
      'password': new FormControl()
    })
  }

  loginData(login:FormGroup) {
    this.appService.users().subscribe(res =>{
        const user = res.find((a:any)=> {
          return a.email === this.login.value.email && a.password === this.login.value.password
        });

        if (user) {
          alert("You are successfully login");
          localStorage.setItem('email', JSON.stringify(this.login.value.email));
          this.getInformation(this.login.value.email);
          this.login.reset();
          this.isTrue = true;
          this._route.navigate(["home"]);
        } else {
          alert("User Not Found");
          this._route.navigate(["login"]);
        }
    }, err => {
      alert("Something went wrong");
    });
  }

  getInformation(email: string){
    this.appService.account().subscribe((res) => {
      this.deviceArray = res;
      this.jsonData = this.deviceArray['clients'];

      this.jsonData.find((a:any)=> {
        if(a.email === email) {
          localStorage.setItem('id', JSON.stringify(a.id));
          localStorage.setItem('name', JSON.stringify(a.name));
        }
      });
    }, err => {
      alert("Something went wrong");
    });
  }
}

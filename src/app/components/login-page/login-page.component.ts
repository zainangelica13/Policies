import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApicallService } from 'src/app/services/apicall.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public jsonData: any;
  public deviceArray: any;

  constructor(
    private _route:Router, 
    private http: HttpClient, 
    private appService: ApicallService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,) {
    if(this.appService.userEmail == "admin") {
      this._route.navigate(["admin"]);
    }
    else if(this.appService.userName && this.appService.userEmail && this.appService.userID) {
			this._route.navigate(["home"]);
		}
  }
  
  login:FormGroup|any;

  ngOnInit() {
    this.login = this.formBuilder.group({
      email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]]
    })
  }

  loginData(login:FormGroup) {
    this.alertService.clear();
    this.appService.users().subscribe(res =>{
        const user = res.find((a:any)=> {
          return a.email === this.login.value.email && a.password === this.login.value.password
        });

        if (user) {
          this.alertService.success('You have successfully logged in', { keepAfterRouteChange: true });
          localStorage.setItem('email', JSON.stringify(this.login.value.email));
          if(this.login.value.email == "admin") {
            this.login.reset();
            this._route.navigate(["admin"]);
          } else {
            this.getInformation(this.login.value.email);
            this.login.reset();
            this._route.navigate(["home"]);
          }
        } else {
          this.login.reset();
          this.alertService.error("User Not Found!");
        }
    }, err => {
      this.alertService.error(err);
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
          localStorage.setItem('role', JSON.stringify(a.role));
        }
      });
    }, err => {
      this.alertService.error(err);
    });
  }
}

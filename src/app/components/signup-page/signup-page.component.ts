import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApicallService } from 'src/app/services/apicall.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {
  public jsonData: any;
  public deviceArray: any;

  constructor(private _route:Router, private http: HttpClient, private appService: ApicallService) {
  }
  
  signup:FormGroup|any;
  useremail:any;
  userid:any;
  ngOnInit() {
    this.signup = new FormGroup({
      'id': new FormControl(),
      'email': new FormControl(),
      'password': new FormControl()
    })
  }

  registerData(signup:FormGroup) {
    this.useremail = this.signup.value.email;
    this.userid = this.signup.value.id;

    
    this.appService.account().subscribe((res) => {
      this.deviceArray = res;
      this.jsonData = this.deviceArray['clients'];

      const user = this.jsonData.find((a:any)=> { 
        return a.email === this.useremail && a.id === this.userid
      });

      if (user) {
        this.http.post<any>("http://localhost:3000/users", this.signup.value)
        .subscribe(res => {
          this.signup.reset();
          this._route.navigate(["login"]);
        }, err => {
          alert("Something went wrong");
        });
      } else {
        alert("ID: " + this.userid + "is not on account list!");
      }
    }, err => {
      alert("Something went wrong");
    });
  }
}

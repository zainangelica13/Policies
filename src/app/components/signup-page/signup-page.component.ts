import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApicallService } from 'src/app/services/apicall.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {
  public jsonData: any;
  public deviceArray: any;
  submitted = false;

  constructor(
    private _route:Router, 
    private http: HttpClient, 
    private appService: ApicallService, 
    private formBuilder: FormBuilder,
    private alertService: AlertService) {
  }
  
  signup:FormGroup|any;
  useremail:any;
  userid:any;
  ngOnInit() {
    this.signup = this.formBuilder.group({
      id:['', Validators.required],
      email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password:['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]],
      confirmpassword:['', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]]
    })
  }

  registerData(signup:FormGroup) {
    this.submitted = true;
    this.useremail = this.signup.value.email;
    this.userid = this.signup.value.id;

    if(this.useremail.invalid) {
      return;
    }
    
    this.alertService.clear();
    
    if(this.signup.value.password === this.signup.value.confirmpassword) {
      this.appService.account().subscribe((res) => {

        const user = res['clients'].find((a:any)=> { 
          return a.email === this.useremail && a.id === this.userid
        });

        if (user) {
            this.appService.users().subscribe(res => {
              const duplicate = res.find((a:any) => {
                return a.email === this.useremail;
              });

              if (!duplicate) {
                  this.http.post<any>("http://localhost:3000/users", this.signup.value)
                  .subscribe(res => {
                      this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                      this.signup.reset();
                      this._route.navigate(["login"]);
                  }, err => {
                    this.signup.reset();
                    this.alertService.error(err);
                  });
              } else {
                this.signup.reset();
                this.alertService.error("This email is already registered!");
              }
            })
        } else {
          this.alertService.error("ID: " + this.userid + "is not on account list!");
        }
      }, err => {
        this.alertService.error(err);
      });
    } else {
      this.alertService.error("Password and Confirm Password did not match!");
    }
  }
}

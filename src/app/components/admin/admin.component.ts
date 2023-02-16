import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApicallService } from 'src/app/services/apicall.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  searchValue = '';
	accountType: string = "All";
  order: string = '';
	inOrder:boolean = false;
	public username: any;
	public useremail: any;
	public userid: any;
	public userrole: any;
	public userList: any;
	public count: any;
	page = 1;

  constructor(
		private _route:Router, 
		private http: HttpClient, 
		private appService: ApicallService,
		private alertService: AlertService) {

		if (!this.appService.userEmail) {
			this._route.navigate(["login"]);
		} else if (this.appService.userEmail != "admin") {
      this._route.navigate(["home"]);
    }
		
		this.useremail = this.appService.userEmail;

    this.userAccount();
	}

  userAccount(){
    this.appService.users().subscribe((res) => {
      this.userList = res.filter((d:any) => {
        d['isEdit'] = false;
        return d
      });

      this.count = Object.keys(this.userList).length;
    })
  }

  getUser(user: any) {
    user.isEdit = true;
  }

  deleteUser(users: any) {
    if(confirm("Are you sure you want to delete this user?" + users.email)) {
      this.http.delete<any>("http://localhost:3000/users/" + users.id, users)
      .subscribe(res => {
          this.alertService.success('Update Successfulyy', { keepAfterRouteChange: true });
      }, err => {
        this.alertService.error(err);
      });
      window.location.reload();
    }
  }

  saveUser(users: any) {
    users.isEdit = true;
    
    this.http.put<any>("http://localhost:3000/users/" + users.id, users)
    .subscribe(res => {
        this.alertService.success('Update Successfulyy', { keepAfterRouteChange: true });
    }, err => {
      this.alertService.error(err);
    });
    
    window.location.reload();
  }

  close(user: any) {
    user.isEdit = false;
  }

  ChangeAccountType(type: string){
    this.accountType = type;
    this.userAccount();
  }

  onSort(column:string) {
		this.order = column;
    this.inOrder = !this.inOrder;
	}

	logout(){
		localStorage.clear();
		this._route.navigate(["login"]);
	}
}

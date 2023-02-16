import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApicallService } from 'src/app/services/apicall.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent {
	searchValue = '';
	accountType: string = "All";
  	order: string = '';
	inOrder:boolean = false;
	public username: any;
	public useremail: any;
	public userid: any;
	public userrole: any;
	public clientList: any;
	public deviceArray: any;
	public count: any;
	page = 1;

  constructor(
		private _route:Router, 
		private readonly http: HttpClient, 
		private appService: ApicallService,
		private alertService: AlertService) {

		if(this.appService.userRole != "admin") {
			this._route.navigate(["home"]);
		}
		else if(!this.appService.userName && !this.appService.userEmail && !this.appService.userID && !this.appService.userRole) {
			this._route.navigate(["login"]);
		}
		
		this.username = this.appService.userName;
		this.useremail = this.appService.userEmail;
		this.userid = this.appService.userID;
		this.userrole = this.appService.userRole;

    this.userAccount();
	}

	userAccount(){
		this.appService.account().subscribe((res) => {
		this.clientList = res['clients'].filter((d:any) => {
			if (this.accountType == "User") {
			return d.role.indexOf("user")>-1
			} else if (this.accountType == "Admin") {
			return d.role.indexOf("admin")>-1
			} else {
			return d
			}
		});

		this.count = Object.keys(this.clientList).length;
		})
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

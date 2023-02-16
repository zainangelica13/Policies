import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApicallService } from 'src/app/services/apicall.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  	selectedSummary = 'total';
	searchValue = '';
	order: string = "Order by";
	sort: string = "Sort by";
	public username: any;
	public useremail: any;
	public userid: any;
	public userrole: any;
	public totalPolicy: any = 0;
	public insPolicy: any = 0;
	public fPaymentPolicy: any = 0;
	public data: Object[] = [];
	public policyData: any;
	public count: any = 0;
	page = 1;
  

	constructor(
		private _route:Router, 
		private readonly http: HttpClient, 
		private appService: ApicallService,
		private alertService: AlertService) {

		if(!this.appService.userName && !this.appService.userEmail && !this.appService.userID && !this.appService.userRole) {
			this._route.navigate(["login"]);
		}
		
		this.username = this.appService.userName;
		this.useremail = this.appService.userEmail;
		this.userid = this.appService.userID;
		this.userrole = this.appService.userRole;
		this.home();
	}

	ChangeOrderBy(newOrder: string) { 
		this.order = newOrder;
	}

	ChangeSortBy(newSort: string) { 
		this.sort = newSort;
	}

  	nav(summary: string) {
    	this.selectedSummary = summary;
		this.home();
  	}

	logout(){
		localStorage.clear();
		this._route.navigate(["login"]);
	}

	home() {
		this.appService.policies().subscribe((res) => {
			var total = 0, ins = 0, fpayment = 0;
			this.policyData =  res['policies'].filter((d:any) => {
				if(d.clientId === this.userid) {
					if(this.selectedSummary == "total"){
						return d
					} else if (this.selectedSummary == "installment" && d.installmentPayment === true) {
						return d.installmentPayment.toString().indexOf("true")>-1
					} else if (this.selectedSummary == "fullpayment" && d.installmentPayment === false) { 
						return d.installmentPayment.toString().indexOf("false")>-1
					}
				}
			});

			res['policies'].find((a:any)=> {
				if(a.clientId === this.userid) {
					this.totalPolicy = total++;
					if(a.installmentPayment === true) {
						this.insPolicy = ins++;
					}
					if(a.installmentPayment === false) {
						this.fPaymentPolicy = fpayment++;
					}
				}
			});

			this.count = Object.keys(this.policyData).length;
		}, err => {
			this.alertService.error(err);
		});
	}
}

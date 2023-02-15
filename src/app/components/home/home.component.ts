import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ApicallService } from 'src/app/services/apicall.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

const states = [
	'Alabama',
	'Alaska'
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  	selectedSummary = 'total';
	searchValue = '';
  	public model: any;
	public username: any;
	public useremail: any;
	public userid: any;
	public jsonData: any;
	public deviceArray: any;
	public totalPolicy: any;
	public insPolicy: any;
	public fPaymentPolicy: any;
	public data: Object[] = [];
	public jsonData2: any;
	public jsonData3: any;
	public count: any;
	page = 1;
  

	constructor(private _route:Router, private readonly http: HttpClient, private appService: ApicallService) {

		if(!this.appService.userName && !this.appService.userEmail && !this.appService.userID) {
			this._route.navigate(["login"]);
		}
		
		this.username = this.appService.userName;
		this.useremail = this.appService.userEmail;
		this.userid = this.appService.userID;
		this.summary();
	}

  	useLanguage(summary: string) {
    	this.selectedSummary = summary;
		this.data = [];
		this.jsonData2 = this.summary();
  	}

	logout(){
		localStorage.clear();
		this._route.navigate(["login"]);
	}

	summary(){
		this.appService.policies().subscribe((res) => {
			this.deviceArray = res;
			this.jsonData = this.deviceArray['policies'];
			var total = 0, ins = 0, fpayment = 0;

			//total
			const policy = this.jsonData.find((a:any)=> {
				if(a.clientId === this.userid) {
					total++;
					if(a.installmentPayment === true) {
						ins++;
					}
					if(a.installmentPayment === false) {
						fpayment++;
					}

					if(this.selectedSummary == "total"){
						this.data.push(a);
					} else if (this.selectedSummary == "installment" && a.installmentPayment === true) {
						this.data.push(a);
					} else if (this.selectedSummary == "fullpayment" && a.installmentPayment === false) { 
						this.data.push(a);
					}
				}
			});

			this.jsonData2 = this.data;
			this.totalPolicy = total;
			this.insPolicy = ins;
			this.fPaymentPolicy = fpayment;
			this.count = this.selectedSummary == "total" ? this.totalPolicy : this.selectedSummary == "installment" ? this.insPolicy : this.fPaymentPolicy;
			
		  }, err => {
			alert("Something went wrong");
		  });
	}
}

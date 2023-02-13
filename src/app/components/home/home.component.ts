import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ApicallService } from 'src/app/services/apicall.service';
import { User } from 'src/app/models/user.model';

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
	name = 'SiddAjmera';
  	public model: any;
	public user: any;
	public id: any;
	public jsonData: any;
	public deviceArray: any;
	public totalPolicy: any;
	public insPolicy: any;
	public fPaymentPolicy: any;
	public data: Object[] = [];
	public jsonData2: any;
  

	constructor(private readonly http: HttpClient, private appService: ApicallService) {
		this.user = this.appService.userEmail;
		this.id = this.appService.userID;

		this.summary();
	}

	search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(200),
			distinctUntilChanged(),
			map((term) =>
				term.length < 2 ? [] : states.filter((v) => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
			),
		);

  	useLanguage(summary: string) {
    	// this.translate.use(language);
    	this.selectedSummary = summary;
		this.data = [];
		this.jsonData2 = this.summary();
		
		
  	}

	summary(){
		this.appService.policies().subscribe((res) => {
			this.deviceArray = res;
			this.jsonData = this.deviceArray['policies'];
			var total = 0, ins = 0, fpayment = 0;

			//total
			const policy = this.jsonData.find((a:any)=> {
				if(a.clientId === this.id) {
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
			
		  }, err => {
			alert("Something went wrong");
		  });
	}
}

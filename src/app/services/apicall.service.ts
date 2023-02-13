import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';3
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  private userEmailSubject: BehaviorSubject<User | null>;
  public email: Observable<User | null>;

  private userIDSubject: BehaviorSubject<User | null>;
  public id: Observable<User | null>;

  constructor(private http: HttpClient, private _route:Router) {
      this.userEmailSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('email')!));
      this.email = this.userEmailSubject.asObservable();

      this.userIDSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('id')!));
      this.id = this.userIDSubject.asObservable();
   }

  public get userEmail() {
    return this.userEmailSubject.value;
  }

  public get userID() {
    return this.userIDSubject.value;
  }

  account() {
    return this.http.get<any>("https://www.mocky.io/v2/5808862710000087232b75ac/");
  }

  users(){
    return this.http.get<any>("http://localhost:3000/users");
  }

  policies(){
    return this.http.get<any>("http://www.mocky.io/v2/580891a4100000e8242b75c5");
  }
}

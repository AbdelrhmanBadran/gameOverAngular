import { LoginForm } from './../interfaces/login-form';
import { Router } from '@angular/router';
import { RegisterForm } from './../interfaces/register-form';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(private _HttpClient:HttpClient , private _Router:Router) {
    if (localStorage.getItem('userData') !== null) {
      this.userData.next(JSON.parse(localStorage.getItem('userData')!))
    }
  }
  baseUrl:string = 'https://ecommerce.routemisr.com/api/v1/auth/'

  register(userData:RegisterForm):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}signup` , userData )
  }

  login(userData:LoginForm):Observable<any>
  {
    return this._HttpClient.post(`${this.baseUrl}signin` , userData )
  }
  logOut()
  {
    this.userData.next(null)
    localStorage.removeItem('userData')
    this._Router.navigate(['/blank/login'])

  }
}

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

  userId:BehaviorSubject<any> = new BehaviorSubject(null)

  constructor(private _HttpClient:HttpClient , private _Router:Router) {
    if (localStorage.getItem('userData') !==null) {
      this.userId.next(JSON.parse(localStorage.getItem('userData')!))
    }
  }

  register(userData:RegisterForm):Observable<any>
  {
    return this._HttpClient.post('https://sticky-note-fe.vercel.app/signup' , userData )
  }

  login(userData:LoginForm):Observable<any>
  {
    return this._HttpClient.post('https://sticky-note-fe.vercel.app/signin' , userData )
  }
  logOut()
  {
    this.userId.next(null)
    localStorage.removeItem('userData')
    this._Router.navigate(['/blank/login'])

  }
}

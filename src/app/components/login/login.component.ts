import { Component } from '@angular/core';
import { FormGroup ,  FormControl , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService , private _Router:Router){ }

  errMsg:string = '';
  isLoading:boolean = false;

  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.required , Validators.pattern(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)]),
    password:new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),

  })


  register(loginForm:FormGroup){

    this.isLoading = true;
    if (loginForm.valid) {
      this._AuthService.login(loginForm.value).subscribe({
      next:res=>{
        console.log(res);
        if (res.message == 'success') {
          localStorage.setItem('userData' , JSON.stringify(res.user))
          this._Router.navigate(['/blank/home'])
          this._AuthService.userId.next(res.user)
        }else{
          this.errMsg = res.message
          console.log(this.errMsg);
        }
      },
      error:err=>{
        console.log(err);

      },
      complete:()=> this.isLoading = false
    })
    }


  }

}

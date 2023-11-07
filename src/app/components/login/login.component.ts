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
  err:boolean = false;

  loginForm:FormGroup = new FormGroup({

    email: new FormControl(null , [Validators.required  ,Validators.email]),
    password: new FormControl(null , [Validators.required  , Validators.pattern(/^[a-z0-9]{3,}$/) ])

  })


  login(loginForm:FormGroup){
    console.log(loginForm.value);
    this.isLoading = true
    if (loginForm.valid)
    {
      this._AuthService.login(loginForm.value).subscribe({
        next: res=>{
          console.log(res);
          if(res.message == 'success'){
            localStorage.setItem('uToken' , res.token)
            this._AuthService.userData.next(res.token)
            this._Router.navigate(['/blank/home'])
            this.isLoading =false
          }
        },
        error: err=>{
          console.log(err);
            this.err = true
            this.errMsg = err.error.message
            this.isLoading = false

        }
      })
    }
  }


}

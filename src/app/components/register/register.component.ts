import { Component } from '@angular/core';
import { FormGroup ,  FormControl , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService , private _Router:Router){ }

  errMsg:string = '';
  isLoading:boolean = false;
  err:boolean = false;

  registerForm:FormGroup = new FormGroup({
    name: new FormControl(null , [Validators.required , Validators.maxLength(20) , Validators.minLength(4) , Validators.pattern(/^[A-Z][a-z]{0,}$/)]),
    email: new FormControl(null , [Validators.required  ,Validators.email]),
    password: new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) ]),
    rePassword: new FormControl(null , [Validators.required  ]),
    phone: new FormControl(null , [Validators.required  , Validators.pattern(/^01[0125][0-9]{8}$/)])
  } , { validators: this.rePasswrdMatch } )

  rePasswrdMatch(registerForm:any)
  {
    let rePassword = registerForm.get('rePassword')?.value
    let Password = registerForm.get('password')?.value
    if (rePassword === Password) {
      return null
    }else{
      registerForm.get('rePassword')?.setErrors({passwordMatch :'Must match password'})
      return {passwordMatch : 'Must match password'}
    }
  }



  register(registerForm:FormGroup){
    this.isLoading = true
    if (registerForm.valid) {

      this._AuthService.register(registerForm.value).subscribe({
        next: res=>{
          // console.log(res);
          if(res.message == 'success'){
            localStorage.setItem('uToken' , res.token)
            this._Router.navigate(['blank/login'])
            console.log('Done');
            this.isLoading = false
          }
        },
        error: err=>{
            this.err = true
            this.errMsg = err.error.message
          this.isLoading = false
        }
      })
    }
  }





}

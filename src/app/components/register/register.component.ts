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

  registerForm:FormGroup = new FormGroup({
    first_name: new FormControl(null , [Validators.required , Validators.pattern(/^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/)]),
    last_name:new FormControl(null , [Validators.required , Validators.pattern(/^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/)]),
    email: new FormControl(null , [Validators.required , Validators.pattern(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)]),
    password:new FormControl(null , [Validators.required , Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
    age:new FormControl(null , [Validators.required , Validators.pattern(/^([1-7][0-9]|80)$/)])
  })


  register(registerForm:FormGroup){

    this.isLoading = true;
    if (registerForm.valid) {
      this._AuthService.register(registerForm.value).subscribe({
      next:res=>{
        if (res.message == 'success') {
          this._Router.navigate(['/blank/login'])
        }else{
          this.errMsg = res.errors.email.message
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

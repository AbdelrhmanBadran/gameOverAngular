import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {


  constructor(private _AuthService:AuthService){ }

  isLogin:boolean = false

  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next: userData=>{
        if (userData !== null) {
          this.isLogin = true
        }else{
          this.isLogin = false
        }
      }
    })
  }

  logOut(){
    this._AuthService.logOut()
  }
}

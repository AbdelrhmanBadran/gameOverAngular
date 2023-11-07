import { Router } from '@angular/router';
import { Game } from './../../interfaces/game';
import { Component } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import Typed from 'typed.js'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isLoading:boolean = true
  recommand:Game[] = []

  constructor(private _GamesService:GamesService , private _Router:Router){ }

  ngOnInit(): void {

    const typed = new Typed('#element', {
      strings: ['Personalized Recommendations'],
      typeSpeed: 100,
      backSpeed: 100,
      showCursor: true,
      cursorChar: '|',
      loop: true
    });

    this._GamesService.getHomeGames().subscribe({
      next:res=>{
        setTimeout(() => {
          console.log(res);
          this.recommand = res.slice(0,3)
          this.isLoading = false
        }, 500);
      },
      error: err=>{
        console.log(err);
      }
    })
  }
}

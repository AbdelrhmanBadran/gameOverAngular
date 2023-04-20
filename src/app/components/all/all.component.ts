import { Game } from './../../interfaces/game';
import { Component } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent {


  allGames:Game[] = []
  noOfShownData:number = 20
  noOfClick:number = 1
  isLoading:boolean = true
  constructor(private _GamesService:GamesService){ }


  ngOnInit(): void {
    this._GamesService.getAllGames().subscribe({
      next:res=>{
        setTimeout(() => {
          console.log(res);
          this.allGames = res
          this.isLoading = false
        }, 1000);
      },
      error:err=>{
        console.log(err);

      }
    })
  }

  seeMore(){
    this.noOfClick++
    this.noOfShownData = 20 * this.noOfClick
  }
}

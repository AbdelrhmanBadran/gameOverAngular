import { Game } from './../../interfaces/game';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent {

  constructor(private _ActivatedRoute:ActivatedRoute , private _GamesService:GamesService){ }
  
  platform:string = '';
  gamesPlate:Game[] = []
  noOfShownData!:number
  noOfClick!:number
  isLoading!:boolean

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: params=>{
        this.noOfClick = 1
        this.noOfShownData = 20
        this.isLoading = true
        console.log(params.get('platform'));
        this.platform = params.get('platform')!;
        this._GamesService.getPlatGames(this.platform).subscribe({
          next:res=> {
            setTimeout(() => {
              console.log(res);
              this.gamesPlate = res
              this.isLoading = false
            }, 1000);
          },
          error:err=>{
            console.log(err);
            this.isLoading = false
          }
        })
      }
    })
  }

  seeMore(){
    this.noOfClick++
    this.noOfShownData = 20 * this.noOfClick
  }
}

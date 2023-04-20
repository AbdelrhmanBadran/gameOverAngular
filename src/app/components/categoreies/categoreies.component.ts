import { Game } from './../../interfaces/game';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-categoreies',
  templateUrl: './categoreies.component.html',
  styleUrls: ['./categoreies.component.scss']
})
export class CategoreiesComponent {


  constructor(private _ActivatedRoute:ActivatedRoute , private _GamesService:GamesService){ }

  cate:string = '';
  gamesCategory:Game[] = []
  noOfShownData!:number
  noOfClick!:number
  isLoading!:boolean
  lengthData!:number
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: params=>{
        this.noOfShownData = 20
        this.noOfClick = 1
        this.isLoading = true
        console.log(params.get('cate'));
        this.cate = params.get('cate')!;

        this._GamesService.getCategoryGames(this.cate).subscribe({
          next:res=> {
            setTimeout(() => {
              console.log(res);
              this.gamesCategory = res
              this.lengthData = res.length
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

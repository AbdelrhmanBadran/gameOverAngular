import { Game } from './../../interfaces/game';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss']
})
export class SortByComponent {

  constructor(private _ActivatedRoute:ActivatedRoute , private _GamesService:GamesService){ }

  sort:string = '';
  gamesSorted:Game[] = []
  noOfShownData!:number
  noOfClick!:number
  isLoading!:boolean

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: params=>{
        this.noOfShownData = 20
        this.noOfClick = 1
        this.isLoading = true
        console.log(params.get('sort'));
        this.sort = params.get('sort')!;

        this._GamesService.getSortedGames(this.sort).subscribe({
          next:res=> {
            setTimeout(() => {
              console.log(res);
              this.gamesSorted = res
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

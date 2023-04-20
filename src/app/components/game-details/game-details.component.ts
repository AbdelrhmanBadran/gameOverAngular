import { GameDetails } from './../../interfaces/game-details';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent {

  constructor(private _GamesService:GamesService , private _ActivatedRoute:ActivatedRoute){ }

  id:string = '';
  gameDetails!:GameDetails|null
  screenshots:any
  backGround:string = ''
  videoPath:string = ''
  isLoading!:boolean

  ngOnInit(): void {
    document.getElementById('image')?.classList.add('')
    this.isLoading = true;
    this._ActivatedRoute.paramMap.subscribe({
      next:params=>{
        this.id = params.get('id')!
        this._GamesService.getSpecficGame(this.id).subscribe({
          next:res=>{
            console.log(res);
            
            this.gameDetails = res
            this.backGround = `url(${this.gameDetails?.thumbnail.replace('thumbnail' , 'background')}) !important`
            this.screenshots =res.screenshots
            this.videoPath = this.gameDetails?.thumbnail.replace('thumbnail.jpg' , 'videoplayback.webm')!
            this.isLoading = false
          },
          error:err=>{
            console.log(err);
            this.isLoading = false
          }
        })
      }
    })
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  Enter(video:any , image:any){
    video.play();
    image.classList.add('opacity-0')
  }
  Leave(video:any , image:any){
    video.pause() ;
    image.classList.remove('opacity-0')
  }

}

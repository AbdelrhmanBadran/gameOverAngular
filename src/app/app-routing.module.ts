import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout/blank-layout.component';
import { HomeComponent } from './components/home/home.component';
import { AllComponent } from './components/all/all.component';
import { PlatformComponent } from './components/platform/platform.component';
import { SortByComponent } from './components/sort-by/sort-by.component';
import { CategoreiesComponent } from './components/categoreies/categoreies.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';

const routes: Routes = [
  {path:'' , redirectTo:'blank' , pathMatch:'full'},
  {path:'blank' , component:BlankLayoutComponent , children:[
    {path:'' , redirectTo:'home' , pathMatch:'full' , title:'home'},
    {path:'home' , canActivate:[AuthGuard], component:HomeComponent , title:'home'},
    {path:'all' , canActivate:[AuthGuard], component:AllComponent , title:'all'},
    {path:'platform/:platform' , canActivate:[AuthGuard], component:PlatformComponent , title:'platform'},
    {path:'sortBy/:sort' , canActivate:[AuthGuard], component:SortByComponent , title:'sort-by'},
    {path:'category/:cate' , canActivate:[AuthGuard], component:CategoreiesComponent ,title:'categories'},
    {path:'gameDetails/:id' , canActivate:[AuthGuard], component:GameDetailsComponent ,title:'gameDetails'},
    {path:'login' , component:LoginComponent , title:'login'},
    {path:'register' , component:RegisterComponent , title:'register'},
  ]},
  {path:'**' , component:NotFoundComponent , title:'notFound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

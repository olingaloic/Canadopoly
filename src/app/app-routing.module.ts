import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { BoardComponent } from './components/board/board.component';
import { GameOverComponent } from './components/game-over/game-over.component';

const routes: Routes = [
  { path: '', component: GameComponent },
  { path: 'gameOver', component: GameOverComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

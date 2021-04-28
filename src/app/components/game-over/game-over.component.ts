import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from 'src/app/model/player';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent implements OnInit {
  playerName: string;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.playerName =  this.route.snapshot.paramMap.get('playerName');

  }

  playAgain(){
    this.router.navigate(['/']);
  }

}

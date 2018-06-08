import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-players',
  templateUrl: './top-players.component.html',
  styleUrls: ['./top-players.component.scss']
})
export class TopPlayersComponent implements OnInit {

  winnerPlayerName: string = "Shankarmurthy";
  runnersUpPlayerName: string = "Adithya";

  constructor() { }

  ngOnInit() {
  }

}

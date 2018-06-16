import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../api';

@Component({
  selector: 'app-top-players',
  templateUrl: './top-players.component.html',
  styleUrls: ['./top-players.component.scss']
})
export class TopPlayersComponent implements OnInit {

  @Input() winnerPlayer: User;
  @Input() runnersUpPlayer: User;

  constructor() { }

  ngOnInit() {
  }

}

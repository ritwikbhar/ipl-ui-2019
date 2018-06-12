import { Component, OnInit, Input } from '@angular/core';
import { Team } from '../../../match/models/Team';

@Component({
  selector: 'app-competing-teams',
  templateUrl: './competing-teams.component.html',
  styleUrls: ['./competing-teams.component.scss']
})
export class CompetingTeamsComponent implements OnInit {

  @Input() team1 : Team;
  @Input() team2 : Team;
  
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../../match/match.service';
import { Match } from '../../../match/models/Match';

@Component({
  selector: 'app-todays-matches',
  templateUrl: './todays-matches.component.html',
  styleUrls: ['./todays-matches.component.scss']
})
export class TodaysMatchesComponent implements OnInit {

  matches : Match[];

  constructor(private matchService : MatchService) { }

  ngOnInit() {
    this.matchService.getMatchesForToday().then(matches => {
      this.matches = matches;
      console.log("Matches received", this.matches);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { League } from '../models/League';
import { LeaguesService } from '../leagues.service';

@Component({
  selector: 'app-league-details',
  templateUrl: './league-details.component.html',
  styleUrls: ['./league-details.component.scss']
})
export class LeagueDetailsComponent implements OnInit {

  leagueId : string;
  league: League;


  constructor(private route : ActivatedRoute, private leagueService : LeaguesService) { 
    route.params.subscribe(params => {
      this.leagueId = params['id'];
      this.leagueService.getLeagueById(this.leagueId).then(league=>{
        this.league = league;
      });
    });
  }

  isWinPredictor(){
    return this.league.cType === "WIN_PREDICTOR";
  }

  isStatQuiz(){
    return this.league.cType === "STAT_QUIZ";
  }

  isFantasyLeague(){
    return this.league.cType === "FANTASY_LEAGUE";
  }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { League } from '../../models/League';
import { Question } from '../../models/Question';
import { LeaguesService } from '../../leagues.service';

@Component({
  selector: 'app-stat-quiz-league',
  templateUrl: './stat-quiz-league.component.html',
  styleUrls: ['./stat-quiz-league.component.scss']
})
export class StatQuizLeagueComponent implements OnInit {

  @Input() league: League;

  questions: Question[];

  constructor(private leagueService : LeaguesService) { }

  ngOnInit() {
    this.leagueService.getQuestionsForLeague(this.league.id).then(questions=>{
      this.questions = questions;
    });
  }

  onBetClicked(value) {
    console.log(value);
  }
}

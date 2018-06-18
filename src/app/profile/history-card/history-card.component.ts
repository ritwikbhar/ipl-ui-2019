import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { UserChallengeAnswer } from '../../api/model/userChallengeAnswer';
import { UserAnswerService } from '../../leagues/user-answer.service';
import { History } from './models/history-model';
import { LeaguesService } from '../../leagues/leagues.service';

@Component({
  selector: 'app-history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.scss']
})
export class HistoryCardComponent implements OnInit {

  private username: string;
  private apiKey: string;

  constructor(private userService: UserService, private userAnswerService: UserAnswerService, private leaguesService: LeaguesService) { }

  ngOnInit() {
    this.userService.getLoginObserver().subscribe(loginResponse => {
      this.username = loginResponse.userId;
      this.apiKey = loginResponse.apiKey;
    });
    this.userService.checkLogin();

    this.userAnswerService.getUserAnswers(this.username).then(userChallengeAnswers => {
      console.log(userChallengeAnswers);

      userChallengeAnswers.forEach(userChallengeAnswer => {
        console.log(userChallengeAnswer);
        let history: History[] = [];

        this.leaguesService.getLeagueById(userChallengeAnswer.challengeId).then(league => {
          if (league.match !== null && league.match.team1 != null && league.match.team2 != null) {
            let internalizedHistory: History = {
              team1: league.match.team1.name.toString(),
              team2: league.match.team2.name.toString(),
              cType: league.cType,
              bet: userChallengeAnswer.coinsBet,
              won: userChallengeAnswer.coinsWon,
            };
            history.push(internalizedHistory);
          }

        });
      });


    });
  }
}

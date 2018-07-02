import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { UserChallengeAnswer } from '../../api/model/userChallengeAnswer';
import { UserAnswerService } from '../../leagues/user-answer.service';
import { History } from './models/history-model';
import { LeaguesService } from '../../leagues/leagues.service';
import { UserChallengeAnswerService } from '../../api';

@Component({
  selector: 'app-history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.scss']
})
export class HistoryCardComponent implements OnInit {

  private username: string;
  private apiKey: string;
  history: History[] = [];

  constructor(private userService: UserService, private userAnswerService: UserAnswerService, private leaguesService: LeaguesService) { }

  ngOnInit() {
    this.userService.getLoginObserver().subscribe(loginResponse => {
      this.username = loginResponse.userId;
      this.apiKey = loginResponse.apiKey;

      this.userAnswerService.getUserAnswers(this.username).then(userChallengeAnswers => {
        this.history = [];
        
        let toInternerlize = userChallengeAnswers.length;
        let internazied = 0;

        userChallengeAnswers.forEach(userChallengeAnswer => {

          this.leaguesService.getLeagueById(userChallengeAnswer.challengeId).then(league => {
            if (league.match !== null && league.match.team1 != null && league.match.team2 != null) {

              internazied++;

              let internalizedHistory: History = {
                date: new Date(league.match.date.toString()).toLocaleString(),
                team1: league.match.team1.name.toString(),
                team2: league.match.team2.name.toString(),
                cType: (league.cType == "WIN_PREDICTOR") ? "Win Predictor" : "Stat Guru",
                bet: userChallengeAnswer.coinsBet,
                won: userChallengeAnswer.coinsWon,
                link: "/leagues/" + league.id,
                challengeId: userChallengeAnswer.challengeId
              };
              if (!this.history.find(h => h.challengeId == userChallengeAnswer.challengeId)) {
                this.history.push(internalizedHistory);
              }

              if(internazied >= toInternerlize){
                this.sortHistory();
              }
            }

          });
        });


      });
    });
    this.userService.checkLogin();
  }

  private sortHistory() : void {
    this.history = this.history.sort((history1, history2) => {
      return Date.parse(history2.date) - Date.parse(history1.date);
    });
  }
}

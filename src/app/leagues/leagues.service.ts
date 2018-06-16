import { Injectable } from '@angular/core';
import { League } from './models/League';
import { MatchService } from '../match/match.service';
import { ChallengeService as ChallegeApi, QuestionsService as QuestionApi, Question } from '../api';

@Injectable()
export class LeaguesService {

  constructor(private matchService: MatchService, private challengesApi: ChallegeApi, private questionApi: QuestionApi) { }

  public getLeagues(): Promise<League[]> {

    return new Promise<League[]>(resolve => {
      //TODO change the locked state to a proper locked

      let leagues: League[] = [];

      this.challengesApi.getChallenges().subscribe(challenges => {
        let totalLeagues = challenges.length;
        let leaguesInternarlized = 0;
        challenges.forEach(challenge => {
          this.matchService.getMatchById(challenge.matchId).then(match => {
            leaguesInternarlized++;

            if (match !== null) {
              let internalizedLeague: League = {
                id: challenge.id,
                cType: challenge.ctype,
                date: new Date(challenge.date).getFullYear().toString(),
                match: match,
                name: (challenge.ctype == "WIN_PREDICTOR") ? "Who is going to win?" : (challenge.ctype == "STAT_QUIZ") ? "Guess Some Stats..." : "",
                locked: false
              };
              leagues.push(internalizedLeague);

              if (leaguesInternarlized >= totalLeagues) {
                leagues = leagues.sort((a, b) => Date.parse(a.match.date.toString()) - Date.parse(b.match.date.toString()))
                resolve(leagues);
              }
            }

          });

        });
      });

    });

  }

  public getLeagueById(id: string): Promise<League> {
    //TODO change the locked state to a proper locked
    return new Promise<League>(resolve => {

      this.challengesApi.getChallenge(id).subscribe(challenge => {
        this.matchService.getMatchById(challenge.matchId).then(match => {
          let internalizedLeague: League = {
            id: challenge.id,
            cType: challenge.ctype,
            date: challenge.date,
            match: match,
            name: challenge.name,
            locked: false
          };
          resolve(internalizedLeague);
        });
      });
    });
  }

  public getQuestionsForLeague(leagueId: string): Promise<Question[]> {
    return new Promise<Question[]>(resolve => {
      this.questionApi.getQuestions(leagueId).subscribe(questions => {
        resolve(questions);
      });
    });
  }
}

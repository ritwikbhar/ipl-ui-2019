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

            if (match !== null && match.team1 != null && match.team2 != null) {
              let internalizedLeague: League = {
                id: challenge.id,
                cType: challenge.ctype,
                date: new Date(challenge.date).getFullYear().toString(),
                match: match,
                name: (challenge.ctype == "WIN_PREDICTOR") ? "Win Predictor" : (challenge.ctype == "STAT_QUIZ") ? "Stat Guru" : "",
                locked: new Date(match.date.toString()) < new Date()
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

  public getLeaguesAfterToday(): Promise<League[]> {
    return new Promise<League[]>(resolve => {
      this.getLeagues().then(leagues => {
        let filteredLeagues = leagues.filter(league => new Date(league.match.date.toString()).setHours(0,0,0,0) >= new Date().setHours(0,0,0,0));
        resolve(filteredLeagues);
      })
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
            locked: new Date(match.date.toString()) < new Date()
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

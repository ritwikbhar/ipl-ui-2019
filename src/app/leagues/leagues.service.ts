import { Injectable } from '@angular/core';
import { League } from './models/League';
import { MatchService } from '../match/match.service';
import { Question } from './models/Question';
import { ChallengeService as ChallegeApi } from '../api';

@Injectable()
export class LeaguesService {

  constructor(private matchService: MatchService, private challengesApi: ChallegeApi) { }

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
      let questions: Question[] = this.questions.filter(question => question.leagueId === leagueId);
      resolve(questions);
    });
  }

  private leagues: any[] = [
    {
      id: '1',
      name: 'Who will win the match?',
      date: '25-06-2018',
      matchId: 1,
      cType: "WIN_PREDICTOR",
      locked: false
    },
    {
      id: '2',
      name: 'Guess some stats...',
      date: '25-06-2018',
      matchId: 2,
      cType: "STAT_QUIZ",
      locked: false
    },
    {
      id: '3',
      name: 'Guess some stats...',
      date: '26-06-2018',
      matchId: 3,
      cType: "STAT_QUIZ",
      locked: true
    },
    {
      id: '4',
      name: 'Who will win the match?',
      date: '26-06-2018',
      matchId: 3,
      cType: "WIN_PREDICTOR",
      locked: true
    },
    {
      id: '5',
      name: 'Who will win the match?',
      date: '25-06-2018',
      matchId: 2,
      cType: "WIN_PREDICTOR",
      locked: false
    }
  ];

  private questions: Question[] = [
    {
      id: '1',
      question: 'Will Ramos get a yellow card today?',
      leagueId: '2',
      answer: null
    },
    {
      id: '2',
      question: 'Will there be a red card?',
      leagueId: '2',
      answer: null
    },
    {
      id: '3',
      question: 'Can Germany have more than 50% possession?',
      leagueId: '2',
      answer: null
    },

    {
      id: '4',
      question: 'Will Neymar score a goal?',
      leagueId: '3',
      answer: true
    },
    {
      id: '5',
      question: 'Will there be a red card today?',
      leagueId: '3',
      answer: false
    },
    {
      id: '6',
      question: 'Can Brail have more than 50% possession?',
      leagueId: '3',
      answer: true
    }
  ]

}

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
      let leagues: League[] = [];
      let totalLeagues = this.leagues.length;
      let leaguesInternarlized = 0;

      this.leagues.forEach(league => {
        this.matchService.getMatchById(league.matchId).then(match => {
          let internalizedLeague: League = {
            id: league.id,
            cType: league.cType,
            date: league.date,
            match: match,
            name: league.name,
            locked: league.locked
          };
          leagues.push(internalizedLeague);
          leaguesInternarlized++;

          if(leaguesInternarlized >= totalLeagues){
            resolve(leagues);
          }
          
        });
      });
    });

  }

  public getLeagueById(id:string) : Promise<League>{
    return new Promise<League>(resolve => {
      let league = this.leagues.filter(league => league.id === id)[0];
      this.matchService.getMatchById(league.matchId).then(match => {
        let internalizedLeague: League = {
          id: league.id,
          cType: league.cType,
          date: league.date,
          match: match,
          name: league.name,
          locked: league.locked
        };
        resolve(internalizedLeague);
      });
      
    });
  }

  public getQuestionsForLeague(leagueId:string):Promise<Question[]> {
    return new Promise<Question[]>(resolve => {
      let questions : Question[] = this.questions.filter(question => question.leagueId === leagueId);
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

  private questions : Question[] = [
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

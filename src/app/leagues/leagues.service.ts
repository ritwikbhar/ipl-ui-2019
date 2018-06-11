import { Injectable } from '@angular/core';
import { League } from './models/League';
import { MatchService } from '../match/match.service';

@Injectable()
export class LeaguesService {

  constructor(private matchService: MatchService) { }

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
            name: league.name
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
          name: league.name
        };
        resolve(internalizedLeague);
      });
      
    });
  }

  private leagues: any[] = [
    {
      id: '1',
      name: 'Who will win the match?',
      date: '25-06-2018',
      matchId: 1,
      cType: "WIN_PREDICTOR"
    },
    {
      id: '2',
      name: 'Guess some stats...',
      date: '25-06-2018',
      matchId: 2,
      cType: "STAT_QUIZ"
    },
    {
      id: '3',
      name: 'Guess some stats...',
      date: '26-06-2018',
      matchId: 3,
      cType: "STAT_QUIZ"
    },
    {
      id: '4',
      name: 'Who will win the match?',
      date: '26-06-2018',
      matchId: 3,
      cType: "WIN_PREDICTOR"
    }
  ];

}

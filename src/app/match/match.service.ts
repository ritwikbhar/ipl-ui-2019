import { Injectable } from '@angular/core';
import { Team } from './models/Team';
import { Match } from './models/Match';
import { MatchService as MatchApi, TeamsService as TeamsApi } from '../api/api/api';
import { resolve } from 'q';


@Injectable()
export class MatchService {

  constructor(private matchApi: MatchApi, private teamsApi: TeamsApi) { }

  public getMatchById(matchId: String): Promise<Match> {

    return new Promise<Match>(resolve => {

      this.matchApi.getMatch(matchId.toString()).subscribe(match => {
        let team1Id = match.team1;
        let team2Id = match.team2;
        /*if (team1Id && team2Id && team1Id != null && team2Id != null) {
          this.getTeamById(team1Id).then(team1 => {
            this.getTeamById(team2Id).then(team2 => {
              resolve(this.getInternaliedMatch(match, team1, team2));
            });
          });
        }
        else {
          resolve(null);
        }*/
        this.getTeamPairById(team1Id, team2Id, (team1, team2)=>{
          resolve(this.getInternaliedMatch(match, team1, team2));
        })
      });
    });
  }

  public getMatchesForToday(): Promise<Match[]> {
    return new Promise<Match[]>(resolve => {
      this.matchApi.getMatches().subscribe(matches => {

        let internalizedMatches: Match[] = [];
        matches = matches
        .filter(match => new Date(match.date.toString()).setHours(0,0,0,0) == new Date().setHours(0,0,0,0));
        
        matches
        .forEach(match => {
          this.getTeamPairById(match.team1, match.team2, (team1, team2) => {
            internalizedMatches.push(this.getInternaliedMatch(match, team1, team2));
            if (internalizedMatches.length >= matches.length) {
              resolve(
                internalizedMatches
                  .sort((a, b) => Date.parse(a.date.toString()) - Date.parse(b.date.toString()))
                //.filter(match => new Date(match.date.toString()).setHours(0,0,0,0) == new Date().setHours(0,0,0,0))
              );
            }
          });
        })
      });
    });
  }

  public getTeamPairById(team1Id, team2Id, callback: (team1: Team, team2: Team) => void): void {
    let resolvedTeam1: Team, resolvedTeam2: Team;

    if (team1Id && team1Id !== null || team2Id  && team2Id !== null) {

      if (team1Id && team1Id != null) {
        this.getTeamById(team1Id).then(team1 => {
          resolvedTeam1 = team1;
          if (resolvedTeam2 || !team2Id || team2Id == null) {
            callback(resolvedTeam1, resolvedTeam2);
          }
        });
      }

      if (team2Id && team2Id != null) {
        this.getTeamById(team2Id).then(team2 => {
          resolvedTeam2 = team2;
          if (resolvedTeam1 || !team1Id || team1Id == null) {
            callback(resolvedTeam1, resolvedTeam2);
          }
        });
      }
      
    }
    else {
      callback(null, null);
    }
  }


  public getTeamById(teamId: String): Promise<Team> {
    return new Promise<Team>(resolve => {
      if (teamId == null) {
        return resolve(null);
      }
      this.teamsApi.getTeam(teamId.toString()).subscribe(team => {
        let internalizedTeam: Team = {
          id: team.id,
          name: team.name,
          shortName: team.shortName,
          flag: team.flag
        };

        resolve(internalizedTeam);
      });
    });
  }

  private getInternaliedMatch(match, team1: Team, team2: Team): Match {
    let internalizedMatch: Match = {
      id: match.id,
      date: new Date(match.date).toLocaleString(),
      name: match.name,
      stadium: null,
      team1: team1,
      team2: team2,
      team1Score: match.team1Result,
      team2Score: match.team2Result,
      finished: (match.team1Result != null) ? true : false
    };

    return internalizedMatch;
  }

  private matches = [
    {
      id: "1",
      name: "string",
      date: "JUN 25, 2018",
      team1: "1",
      team2: "2",
      stadium: "string",
      team1Score: null,
      team2Score: null,
      finished: false
    },
    {
      id: "2",
      name: "string",
      date: "JUN 25, 2018",
      team1: "3",
      team2: "2",
      stadium: "string",
      team1Score: null,
      team2Score: null,
      finished: false
    },
    {
      id: "3",
      name: "string",
      date: "JUN 25, 2018",
      team1: "3",
      team2: "1",
      stadium: "string",
      team1Score: 2,
      team2Score: 3,
      finished: true
    }
  ];

  private teams: Team[] = [
    {
      id: "1",
      name: "BRAZIL",
      shortName: "BRA",
      flag: "https://www.onlinestores.com/flagdetective/images/download/brazil-hi.jpg"
    },
    {
      id: "2",
      name: "SPAIN",
      shortName: "ESP",
      flag: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Flag_of_Spain.svg/1125px-Flag_of_Spain.svg.png"
    },
    {
      id: "3",
      name: "GERMANY",
      shortName: "GER",
      flag: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1280px-Flag_of_Germany.svg.png"
    }
  ];

}

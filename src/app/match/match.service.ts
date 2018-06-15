import { Injectable } from '@angular/core';
import { Team } from './models/Team';
import { Match } from './models/Match';
import { MatchService as MatchApi, TeamsService as TeamsApi } from '../api/api/api';


@Injectable()
export class MatchService {

  constructor(private matchApi: MatchApi, private teamsApi: TeamsApi) { }

  public getMatchById(matchId: String): Promise<Match> {

    return new Promise<Match>(resolve => {

      this.matchApi.getMatch(matchId.toString()).subscribe(match => {
        let team1Id = match.team1;
        let team2Id = match.team2;
        if (team1Id != null && team2Id != null) {
          this.getTeamById(team1Id).then(team1 => {
            this.getTeamById(team2Id).then(team2 => {
              let internalizedMatch: Match = {
                id: matchId,
                date: new Date(match.date).toLocaleString(),
                name: match.name,
                stadium: null,
                team1: team1,
                team2: team2,
                team1Score: match.team1Result,
                team2Score: match.team2Result,
                finished: (match.team1Result != null) ? true : false
              };
              resolve(internalizedMatch);
            });
          });
        }
      });
    });
  }

  public getTeamById(teamId: String): Promise<Team> {
    return new Promise<Team>(resolve => {
      if(teamId == null){
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

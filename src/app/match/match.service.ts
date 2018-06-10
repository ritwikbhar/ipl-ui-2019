import { Injectable } from '@angular/core';
import { Team } from './models/Team';
import { Match } from './models/Match';

@Injectable()
export class MatchService {

  constructor() { }

  public getMatchById(matchId: String): Promise<Match> {

    return new Promise<Match>(resolve => {
      let match = this.matches.filter(match => match.id == matchId)[0];
      let team1Id = match.team1;
      let team2Id = match.team2;

      this.getTeamById(team1Id).then(team1 => {
        this.getTeamById(team2Id).then(team2 => {
          let internalizedMatch: Match = {
            id: matchId,
            date: match.date,
            name: match.name,
            stadium: null,
            team1: team1,
            team2: team2,
          };
          resolve(internalizedMatch);
        });
      });

    });
  }

  public getTeamById(teamId: String): Promise<Team> {
    let team = this.teams.filter(team => team.id === teamId)[0];
    return Promise.resolve(team);
  }

  private matches = [
    {
      id: "1",
      name: "string",
      date: "JUN 25, 2018",
      team1: "1",
      team2: "2",
      stadium: "string",
      winner: "string",
      winBy: "string"
    },
    {
      id: "2",
      name: "string",
      date: "JUN 25, 2018",
      team1: "3",
      team2: "2",
      stadium: "string",
      winner: "string",
      winBy: "string"
    },
    {
      id: "3",
      name: "string",
      date: "JUN 25, 2018",
      team1: "3",
      team2: "1",
      stadium: "string",
      winner: "string",
      winBy: "string"
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

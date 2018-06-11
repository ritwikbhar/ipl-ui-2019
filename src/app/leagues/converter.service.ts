import { Injectable } from '@angular/core';
import { League } from './models/League';
import { CardDetails } from './league-cards/models/CardDetails';

@Injectable()
export class ConverterService {

  constructor() { }

  public convertFromLeagueToCardDetails(league : League) : CardDetails {
    let cardDetails : CardDetails = {
      leagueId: league.id,
      title: league.name,
      homeTeam: league.match.team1,
      awayTeam: league.match.team2,
      date: league.match.date,
      league: league
    };
    return cardDetails;
  }

}

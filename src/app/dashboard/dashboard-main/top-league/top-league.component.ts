import { Component, OnInit } from '@angular/core';
import { LeaguesService } from '../../../leagues/leagues.service';
import { CardDetails } from '../../../leagues/league-cards/models/CardDetails';
import { ConverterService } from '../../../leagues/converter.service';

@Component({
  selector: 'app-top-league',
  templateUrl: './top-league.component.html',
  styleUrls: ['./top-league.component.scss']
})
export class TopLeagueComponent implements OnInit {

  cardsDetails: CardDetails[];

  constructor(private leaguesService: LeaguesService, private converterService: ConverterService) { }

  ngOnInit() {
    this.cardsDetails = [];
    this.leaguesService.getLeagues().then(leagues => {
      for(let i = 0; i < Math.min(leagues.length, 3); i++){
        let league = leagues[i];
        this.cardsDetails.push(this.converterService.convertFromLeagueToCardDetails(league));
      }
    });
    
  }

}

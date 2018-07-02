import { Component, OnInit } from '@angular/core';
import { LeaguesService } from '../leagues.service';
import { CardDetails } from './models/CardDetails';
import { ConverterService } from '../converter.service';

@Component({
  selector: 'app-league-cards',
  templateUrl: './league-cards.component.html',
  styleUrls: ['./league-cards.component.scss']
})
export class LeagueCardsComponent implements OnInit {

  cardsDetails: CardDetails[];

  constructor(private leaguesService: LeaguesService, private converterService: ConverterService) { }

  ngOnInit() {
    this.cardsDetails = [];
    this.leaguesService.getLeaguesAfterToday().then(leagues => {
      leagues
      .forEach(league => {
      leagues.forEach(league => {
        this.cardsDetails.push(this.converterService.convertFromLeagueToCardDetails(league));
      });
    });
    
  }

}

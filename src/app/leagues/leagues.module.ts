import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { LeaguesMainComponent } from './leagues-main/leagues-main.component';
import { LeagueCardsComponent } from './league-cards/league-cards.component';
import { LeagueCardComponent } from './league-cards/league-card/league-card.component';
import { LeaguesService } from './leagues.service';
import { MatchService } from '../match/match.service';
import { ConverterService } from './converter.service';
import { LeagueDetailsComponent } from './league-details/league-details.component';
import { AppRoutingModule } from '../routing.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule
  ],
  declarations: [
    LeaguesMainComponent, 
    LeagueCardsComponent, 
    LeagueCardComponent, LeagueDetailsComponent
  ],
  exports: [LeaguesMainComponent],
  providers: [LeaguesService, MatchService, ConverterService]
})
export class LeaguesModule { }

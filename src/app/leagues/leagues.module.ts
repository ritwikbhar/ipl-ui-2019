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
import { WinPredictorLeagueComponent } from './league-details/win-predictor-league/win-predictor-league.component';
import { StatQuizLeagueComponent } from './league-details/stat-quiz-league/stat-quiz-league.component';
import { FantasyLeagueComponent } from './league-details/fantasy-league/fantasy-league.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';



@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatSliderModule
  ],
  declarations: [
    LeaguesMainComponent,
    LeagueCardsComponent,
    LeagueCardComponent, LeagueDetailsComponent, WinPredictorLeagueComponent, StatQuizLeagueComponent, FantasyLeagueComponent
  ],
  exports: [LeaguesMainComponent],
  providers: [LeaguesService, MatchService, ConverterService]
})
export class LeaguesModule { }

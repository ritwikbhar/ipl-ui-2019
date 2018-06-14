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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BetBtnComponent } from './bet-btn/bet-btn.component';
import { ConfirmationDialogComponent } from './league-details/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ApiModule } from '../api';
import { CompetingTeamsComponent } from './league-details/competing-teams/competing-teams.component';
import { UserAnswerService } from './user-answer.service';



@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule,
    MatTabsModule,
    MatCardModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatDialogModule,
    ApiModule
  ],
  declarations: [
    LeaguesMainComponent,
    LeagueCardsComponent,
    LeagueCardComponent, LeagueDetailsComponent, WinPredictorLeagueComponent, StatQuizLeagueComponent, FantasyLeagueComponent, BetBtnComponent, ConfirmationDialogComponent, CompetingTeamsComponent
  ],
  entryComponents: [ConfirmationDialogComponent],
  exports: [LeaguesMainComponent],
  providers: [LeaguesService, MatchService, ConverterService, UserAnswerService]
})
export class LeaguesModule { }

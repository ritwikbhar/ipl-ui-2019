import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { ComponentsModule } from '../components/components.module';
import { CarouselComponent } from './dashboard-main/carousel/carousel.component';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { TodaysMatchesComponent } from './dashboard-main/todays-matches/todays-matches.component';
import { TopLeagueComponent } from './dashboard-main/top-league/top-league.component';
import { MatchModule } from '../match/match.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    CarouselModule,
    WavesModule,
    MatchModule
  ],
  declarations: [DashboardMainComponent, CarouselComponent, TodaysMatchesComponent, TopLeagueComponent],
  exports: [DashboardMainComponent]
})
export class DashboardModule { }

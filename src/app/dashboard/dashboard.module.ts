import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { ComponentsModule } from '../components/components.module';
import { CarouselComponent } from './dashboard-main/carousel/carousel.component';
import { CarouselModule, WavesModule } from 'angular-bootstrap-md';
import { TodaysMatchesComponent } from './dashboard-main/todays-matches/todays-matches.component';
import { TopLeagueComponent } from './dashboard-main/top-league/top-league.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    CarouselModule,
    WavesModule
  ],
  declarations: [DashboardMainComponent, CarouselComponent, TodaysMatchesComponent, TopLeagueComponent],
  exports: [DashboardMainComponent]
})
export class DashboardModule { }

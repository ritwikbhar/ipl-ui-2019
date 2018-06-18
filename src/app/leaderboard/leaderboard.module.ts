import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WavesModule } from 'angular-bootstrap-md'
import { ComponentsModule } from '../components/components.module';
import { LeaderboardMainComponent } from './leaderboard-main/leaderboard-main.component';
import { TopPlayersComponent } from './top-players/top-players.component';
import { TableViewComponent } from './table-view/table-view.component';
import { ApiModule } from '../api';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    WavesModule,
    ApiModule
  ],
  declarations: [LeaderboardMainComponent, TopPlayersComponent, TableViewComponent]
})
export class LeaderboardModule { }

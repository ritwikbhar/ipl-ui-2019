import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './routing.module';

import { ComponentsModule } from './components/components.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { LeaguesModule } from './leagues/leagues.module';
import { ProfileModule } from './profile/profile.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { AppComponent } from './app.component';

import {
  AgmCoreModule
} from '@agm/core';
import { FifaScheduleModule } from './fifa-schedule/fifa-schedule.module';
import { FifaScheduleComponent } from './fifa-schedule/fifa-schedule/fifa-schedule.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    LeaderboardModule,
    LeaguesModule,
    DashboardModule,
    ProfileModule,
    FifaScheduleModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

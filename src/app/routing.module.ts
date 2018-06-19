import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LeaderboardMainComponent } from './leaderboard/leaderboard-main/leaderboard-main.component';
import { LeaguesMainComponent } from './leagues/leagues-main/leagues-main.component';
import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';
import { ProfileMainComponent } from './profile/profile-main/profile-main.component';
import { LeagueCardsComponent } from './leagues/league-cards/league-cards.component';
import { LeagueDetailsComponent } from './leagues/league-details/league-details.component';
import { FifaScheduleComponent } from './fifa-schedule/fifa-schedule/fifa-schedule.component';

const routes: Routes = [
  { path: 'leaderboard', component: LeaderboardMainComponent },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { path: 'dashboard', component: DashboardMainComponent },
  {
    path: 'leagues',
    component: LeaguesMainComponent,
    children: [
      {
        path: '',
        component: LeagueCardsComponent
      },
      {
        path: ':id',
        component: LeagueDetailsComponent
      }
    ]
  },
  { path: 'profile', component: ProfileMainComponent },
  { path: 'fifa-schedule', component: FifaScheduleComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


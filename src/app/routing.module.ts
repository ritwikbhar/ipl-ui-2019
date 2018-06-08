import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LeaderboardMainComponent } from './leaderboard/leaderboard-main/leaderboard-main.component';

const routes: Routes = [
  { path: 'leaderboard', component: LeaderboardMainComponent },
  { path: 'dashboard', component: LeaderboardMainComponent },
  { path: 'leagues', component: LeaderboardMainComponent },
  { path: 'profile', component: LeaderboardMainComponent }
];
// { path: '', component: DashboardComponent }];
// { path: '', component: PlayersDashboardComponent }];
// { path: '', component: TeamsDashboardComponent }];
// { path: '', component: ChallengesDashboardComponent }];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


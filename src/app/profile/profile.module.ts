import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WavesModule } from 'angular-bootstrap-md'
import { ComponentsModule } from '../components/components.module';
import { ProfileMainComponent } from './profile-main/profile-main.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { HistoryCardComponent } from './history-card/history-card.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    MatTabsModule,
    WavesModule
  ],
  declarations: [ProfileMainComponent, ProfileCardComponent, HistoryCardComponent]
})
export class ProfileModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WavesModule } from 'angular-bootstrap-md'
import { ComponentsModule } from '../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileMainComponent } from './profile-main/profile-main.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { HistoryCardComponent } from './history-card/history-card.component';
import { UserModule } from '../user/user.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    WavesModule,
    UserModule
  ],
  declarations: [ProfileMainComponent, ProfileCardComponent, HistoryCardComponent]
})
export class ProfileModule { }

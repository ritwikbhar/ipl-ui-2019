import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { FifaScheduleComponent } from './fifa-schedule/fifa-schedule.component';
import { WavesModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    ComponentsModule,
    WavesModule
  ],
  declarations: [FifaScheduleComponent],
  exports: [FifaScheduleComponent]
})
export class FifaScheduleModule { }

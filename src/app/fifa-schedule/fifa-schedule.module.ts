import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { FifaScheduleComponent } from './fifa-schedule/fifa-schedule.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule
  ],
  declarations: [FifaScheduleComponent],
  exports: [FifaScheduleComponent]
})
export class FifaScheduleModule { }

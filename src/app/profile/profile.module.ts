import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileMainComponent } from './profile-main/profile-main.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProfileMainComponent],
  exports: [ProfileMainComponent]
})
export class ProfileModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WavesModule } from 'angular-bootstrap-md'
import { ComponentsModule } from '../components/components.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserMainComponent } from './user-main/user-main.component';
import { UserService } from './user.service';
import { ApiModule } from '../api';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatDialogModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    WavesModule,
    ApiModule
  ],
  providers : [UserService, 
    CookieService],
  entryComponents : [UserMainComponent],
  declarations: [UserMainComponent]
})
export class UserModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscussionMainComponent } from './discussion-main/discussion-main.component';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { ApiModule } from '../api';
import { UserModule } from '../user/user.module';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ApiModule,
    UserModule,
    MatExpansionModule
  ],
  declarations: [DiscussionMainComponent],
  exports: [DiscussionMainComponent]
})
export class DiscussionForumModule { }

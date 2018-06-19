import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { RulesComponent } from './rules/rules.component';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    RouterModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    PaginationComponent,
    RulesComponent
  ],
  providers: [
    CookieService,
    UserService
  ],
  exports: [
    FooterComponent,
    RulesComponent,
    NavbarComponent,
    SidebarComponent,
    PaginationComponent
  ]
})
export class ComponentsModule { }

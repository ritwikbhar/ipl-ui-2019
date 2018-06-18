import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    PaginationComponent
  ],
  providers: [
    CookieService
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    PaginationComponent
  ]
})
export class ComponentsModule { }

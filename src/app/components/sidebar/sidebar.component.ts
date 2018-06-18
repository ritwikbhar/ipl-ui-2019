import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/fifa-schedule', title: 'Fifa Schedule',  icon: 'event_note', class: '' },
    { path: '/leagues', title: 'Leagues',  icon: 'add_to_queue', class: '' },
    { path: '/leaderboard', title: 'Leaderboard',  icon: 'sort', class: '' },
    { path: '/profile', title: 'Profile',  icon: 'perm_identity', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private cookieService : CookieService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logout(){
    this.cookieService.remove("login-response");
    window.location.reload();
  }
}

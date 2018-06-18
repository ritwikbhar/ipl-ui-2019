import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss']
})
export class DashboardMainComponent implements OnInit {

  title = "Dashboard";
  
  constructor(private userService : UserService) { }

  ngOnInit() {
    this.userService.checkLogin();
  }

}

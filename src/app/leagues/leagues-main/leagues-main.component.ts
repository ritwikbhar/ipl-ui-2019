import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-leagues-main',
  templateUrl: './leagues-main.component.html',
  styleUrls: ['./leagues-main.component.scss']
})
export class LeaguesMainComponent implements OnInit {

  title="Leagues";

  private username : string;
  private apiKey : string;
  
  constructor(private userService : UserService) { }

  ngOnInit() {
    this.userService.getLoginObserver().subscribe(loginResponse => {
      this.username = loginResponse.userId;
      this.apiKey = loginResponse.apiKey;
    });
  }

}

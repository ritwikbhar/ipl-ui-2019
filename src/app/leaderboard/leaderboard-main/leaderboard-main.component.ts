import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../api';

@Component({
  selector: 'app-leaderboard-main',
  templateUrl: './leaderboard-main.component.html',
  styleUrls: ['./leaderboard-main.component.css']
})
export class LeaderboardMainComponent implements OnInit {
  title = "Leaderboard";

  users: User[];

  constructor(private userApi: UserService) { }

  ngOnInit() {
    this.userApi.getUsers().toPromise().then(users => {
      this.users = users.sort((a, b) => Number.parseInt(a.coins) - Number.parseInt(b.coins));
    });
  }

  getWinnerPlayer(){
    return this.users[0];
  }

  getRunnersUpPlayer() {
    return this.users[1];
  }

}

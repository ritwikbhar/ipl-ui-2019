import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { UserService as UserApi, User } from '../../api';

@Component({
  selector: 'app-leaderboard-main',
  templateUrl: './leaderboard-main.component.html',
  styleUrls: ['./leaderboard-main.component.css']
})
export class LeaderboardMainComponent implements OnInit {
  title = "Leaderboard";

  users: User[];

  constructor(private userApi: UserApi, private userService : UserService) { }

  ngOnInit() {
    this.userService.checkLogin();
    this.userApi.getUsers().toPromise().then(users => {
      this.users = users.sort((a, b) => Number.parseInt(b.coins) - Number.parseInt(a.coins));
    });
  }

  getWinnerPlayer(){
    return this.users[0];
  }

  getRunnersUpPlayer() {
    return this.users[1];
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.scss']
})
export class ProfileMainComponent implements OnInit {
  title = 'My profile';

  displayName : string;
  coins : number;
  email: string;
  
  constructor(private userService : UserService) { }

  ngOnInit() {
    this.userService.getLoginObserver().subscribe(loginResponse=>{

      this.userService.getUser(loginResponse.userId).then(user => {
        this.displayName = user.displayName;
        this.coins = Number.parseInt(user.coins);
        this.email = user.email;
      })
      
    });
    this.userService.checkLogin();
  }

}

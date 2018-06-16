import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.scss']
})
export class ProfileMainComponent implements OnInit {
  title = 'My profile';
  
  constructor(private userService : UserService) { }

  ngOnInit() {
    this.userService.getLoginObserver().subscribe(data=>{
      console.log("Logged into account: " + data.userId);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  changePasswordForm: FormGroup;
  currentPassword : string;
  newPassword: string;
  confirmNewPassword: string;
  
  constructor(private fb: FormBuilder, private userService : UserService) { }

  ngOnInit() {

    this.changePasswordForm = this.fb.group({
      currentPassword : this.currentPassword,
      newPassword: this.newPassword,
      confirmNewPassword: this.confirmNewPassword
    });
    
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

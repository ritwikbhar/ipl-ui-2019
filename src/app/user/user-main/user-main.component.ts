import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../user.service';
import { LoginResponse } from '../models/LoginResponse';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss']
})
export class UserMainComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;

  selectedTabIndex: number = 0;

  signUpName: string;
  email: string;
  signUpPassword: string;
  password: string;

  signUpLabelVisible: boolean;
  signUpLabelText: string;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserMainComponent>,
    @Inject(MAT_DIALOG_DATA) private data: UserMainComponentInput) {
  }

  ngOnInit() {

    this.signUpLabelVisible = false;

    this.loginForm = this.fb.group({
      email: this.email,
      password: this.password
    });

    this.registerForm = this.fb.group({
      name: this.signUpName,
      email: this.email,
      password: this.signUpPassword
    });
  }

  sendDataBack() {
    //this.data.toNotify.notify('somedata');
  }

  onLoginSubmit() {

    this.data.userService.login(this.email, this.password).then(validatedUser => {

      this.data.callback({
        userId: this.email,
        apiKey: validatedUser.jwtToken,
        expiry: new Date(Date.now() + 3600)
      })

    }).catch(err => {

    });
    this.dialogRef.close();
  }

  onSignupSubmit() {
    this.data.userService.createNewUser(this.signUpName, this.email, this.signUpPassword).then(user => {
      this.signUpLabelText = "Your account has been created. Proceed to login";
      this.signUpLabelVisible = true;
    }).catch(reason => {
      this.signUpLabelText = "Account with email already exists";
      this.signUpLabelVisible = true;
    });
  }

}

export interface UserMainComponentInput {
  userService: UserService,
  callback: (loginResponse: LoginResponse) => void
}

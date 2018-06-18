import { Injectable } from '@angular/core';
import { Observable, AnonymousSubject, Observer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserMainComponent } from './user-main/user-main.component';
import { Notifyable } from '../util/Notifyable';
import { UserService as UserApi, User, ValidatedUser } from './../api';
import { LoginResponse } from './models/LoginResponse';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable()
export class UserService {

  constructor(public dialog: MatDialog, private userApi: UserApi, private cookieService: CookieService) {
    this.observers = [];
    this.loginObservervable = new Observable<LoginResponse>(observer => {
      this.observers.push(observer);
    });

    this.checkLogin();
  }

  private observers: Observer<LoginResponse>[];
  private loginObservervable: Observable<LoginResponse>;
  private loginResponse: LoginResponse;
  private userId: string;
  private apiKey: string;

  private dialogOpened: boolean = false;

  public getLoginObserver(): Observable<LoginResponse> {
    return this.loginObservervable;
  }

  public notify(data: String) {

  }

  public getWalletBalance(): Promise<number> {
    let userId = this.userId;
    return new Promise<number>(resolve => {
      userId = userId.replace(".", "#");
      this.userApi.getUser(userId).subscribe(user => {
        resolve(Number.parseInt(user.coins));
      });
    });
  }

  public getUser(userId: string): Promise<User> {
    userId = userId.replace(".", "#");
    return this.userApi.getUser(userId).toPromise();
  }

  public createNewUser(name, email, password): Promise<User> {
    return this.userApi.addUser({
      id: email,
      displayName: name,
      email: email,
      password: password
    }).toPromise();
  }

  public login(email, password): Promise<ValidatedUser> {
    return this.userApi.login(email, password).toPromise();
  }

  public incrementWalletBalance(amount: number): Promise<number> {
    //TODO: This should not be done on UI side
    this.walletBalance += amount;
    return Promise.resolve(this.walletBalance);
  }

  public decrementWalletBalance(amount: number): Promise<number> {
    //TODO: This should not be done on UI side - should be taken care in backend
    this.walletBalance -= amount;
    return Promise.resolve(this.walletBalance);
  }

  private notifyObservers(loginResponse: LoginResponse) {
    this.observers.forEach(observer => {
      observer.next(loginResponse);
    });
  }

  private openDialog() {
    if (!this.dialogOpened) {
      this.dialogOpened = true;
      let dialogRef = this.dialog.open(UserMainComponent, {
        disableClose: true,
        width: '400px',
        data: {
          userService: this,
          callback: (loginResponse: LoginResponse) => {
            this.dialogOpened = false;
            this.userId = loginResponse.userId;
            this.apiKey = loginResponse.apiKey;
            this.cookieService.put('login-response', JSON.stringify(loginResponse));
            this.notifyObservers(loginResponse);
          }
        }
      });
    }
  }

  public checkLogin() {

    console.log("Checking Login");

    let rawSavedLoginResponse = this.cookieService.get('login-response');
    if (rawSavedLoginResponse) {
      let savedLoginResponse = JSON.parse(rawSavedLoginResponse);


      if (savedLoginResponse && savedLoginResponse.userId && savedLoginResponse.apiKey && savedLoginResponse.expiry) {

        //TODO handle expiry --- if expired open dialog again

        let loginResponse: LoginResponse = {
          apiKey: savedLoginResponse.apiKey,
          expiry: savedLoginResponse.userId,
          userId: savedLoginResponse.userId
        };

        this.userId = loginResponse.userId;
        this.apiKey = loginResponse.apiKey;

        this.notifyObservers(loginResponse);
      }
      else {
        this.openDialog();
      }
    }
    else {
      this.openDialog();
    }
  }

  private walletBalance = 200;
}

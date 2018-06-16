import { Injectable } from '@angular/core';
import { Observable, AnonymousSubject, Observer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserMainComponent } from './user-main/user-main.component';
import { Notifyable } from '../util/Notifyable';
import { UserService as UserApi, User } from './../api';
import { LoginResponse } from './models/LoginResponse';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable()
export class UserService {

  constructor(public dialog: MatDialog, private userApi: UserApi, private cookieService: CookieService) {
    this.observers = [];
    this.loginObservervable = new Observable<LoginResponse>(observer => {
      this.observers.push(observer);
    });
  }

  private observers: Observer<LoginResponse>[];
  private loginObservervable: Observable<LoginResponse>;
  private userId: string;
  private apiKey: string;

  public getLoginObserver(): Observable<LoginResponse> {

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

        this.notifyObservers(loginResponse);
      }
      else {
        this.openDialog();
      }
    }
    else{
      this.openDialog();
    }

    return this.loginObservervable;
  }

  public notify(data: String) {

  }

  public getWalletBalance(): Promise<number> {
    return new Promise<number>(resolve => {
      this.userApi.getUser(this.userId).subscribe(user => {
        resolve(Number.parseInt(user.coins));
      })
    });
  }

  public createNewUser(name, email, password): Promise<User> {
    return this.userApi.addUser({
      id: email,
      displayName: name,
      email: email,
      password: password
    }).toPromise();
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
    let dialogRef = this.dialog.open(UserMainComponent, {
      disableClose: true,
      width: '400px',
      data: {
        userService: this,
        callback: (loginResponse: LoginResponse) => {
          this.userId = loginResponse.userId;
          this.apiKey = loginResponse.apiKey;
          this.cookieService.put('login-response', JSON.stringify(loginResponse));
          this.notifyObservers(loginResponse);
        }
      }
    });
  }

  private walletBalance = 200;
}

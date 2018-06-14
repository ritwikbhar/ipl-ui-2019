import { Injectable } from '@angular/core';
import { Observable, AnonymousSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserMainComponent } from './user-main/user-main.component';
import { Notifyable } from '../util/Notifyable';

@Injectable()
export class UserService implements Notifyable<String>{

  constructor(public dialog: MatDialog) { }

  public getLoginObserver(): Observable<String> {
    return Observable.create(observer => {
      let dialogRef = this.dialog.open(UserMainComponent, {
        disableClose: true,
        width: '400px',
        data: ''
      });
    })
  }

  public notify(data: String) {

  }

  public getWalletBalance(): Promise<number> {
    return new Promise<number>(resolve => {
      resolve(this.walletBalance);
    });
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

  private walletBalance = 200;
}

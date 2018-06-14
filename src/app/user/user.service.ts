import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserMainComponent } from './user-main/user-main.component';
import { Notifyable } from '../../util/Notifyable';

@Injectable()
export class UserService implements Notifyable<String>{

  constructor(public dialog: MatDialog) { }

  public getLoginObserver(): Observable<String> {
    return Observable.create(observer => {
      let dialogRef = this.dialog.open(UserMainComponent, {disableClose: true}, {
        width: '400px',
        data: ''
      });
    })
  }

  public notify(data : String){

  }
}

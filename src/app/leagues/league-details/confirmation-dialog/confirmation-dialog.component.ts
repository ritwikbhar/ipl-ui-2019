import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notifyable } from '../../../util/Notifyable';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  betFeasable : boolean;
  remainingBalance : number;
  bettedAmount: number;
  isWithdrawl: boolean;
  walletBalance : number;

  constructor(
    private userService : UserService,
    private dialogRef : MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data : ConfirmationDialogInput
  ) { }

  ngOnInit() {
    
    this.bettedAmount = this.data.cointToBet
    this.isWithdrawl = this.data.type === ConfirmationType.WITHDRAWL;
    this.userService.getWalletBalance().then(walletBalance => {
      this.betFeasable = walletBalance >= this.bettedAmount;
      this.walletBalance = walletBalance;
      this.remainingBalance = walletBalance - this.bettedAmount;
    })
  }

  confirmClicked(){
    this.data.toNotify.notify('YES');
    this.dialogRef.close();
  }

}

export interface ConfirmationDialogInput {
  toNotify : Notifyable<String>,
  cointToBet: number,
  userId: string,
  type: ConfirmationType
}

export enum ConfirmationType {
  BET,
  WITHDRAWL
}

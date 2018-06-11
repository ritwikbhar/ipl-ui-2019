import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notifyable } from '../../../util/Notifyable';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  betFeasable : boolean;
  remainingBalance : number;
  bettedAmount: number;

  constructor(
    private dialogRef : MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data : ConfirmationDialogInput
  ) { }

  ngOnInit() {
    this.betFeasable = true;
    this.remainingBalance = 10;
    this.bettedAmount = this.data.cointToBet
  }

  confirmClicked(){
    this.data.toNotify.notify('YES');
    this.dialogRef.close();
  }

}

export interface ConfirmationDialogInput {
  toNotify : Notifyable<String>,
  cointToBet: number,
  userId: string
}

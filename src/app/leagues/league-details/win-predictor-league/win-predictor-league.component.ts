import { Component, OnInit, Input } from '@angular/core';
import { League } from '../../models/League';
import { MatSliderChange } from '@angular/material/slider';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent, ConfirmationDialogInput } from '../confirmation-dialog/confirmation-dialog.component';
import { Notifyable } from '../../../util/Notifyable';

@Component({
  selector: 'app-win-predictor-league',
  templateUrl: './win-predictor-league.component.html',
  styleUrls: ['./win-predictor-league.component.scss']
})
export class WinPredictorLeagueComponent implements OnInit, Notifyable<String> {

  @Input() league: League;

  maxVal = 20;
  minVal = 0;

  selectedResult: string = "match would be DRAW";

  private coinsToBet : number;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }

  /**
   * To be called by the modal component to return the result
   * @param result
   */
  notify(result: String) {
    if (result === 'YES') {
      this.continueWithBet();
    }
  }

  onSliderChange(sliderChangeEvent: MatSliderChange) {
    let median = (this.maxVal + this.minVal) / 2;
    if (sliderChangeEvent.value === median) {
      this.selectedResult = "match would be DRAW";
    }
    else if (sliderChangeEvent.value < median) {
      let goalDiff = median - sliderChangeEvent.value;
      this.selectedResult = this.league.match.team1.name + " will win by " + goalDiff + " goals.";
    }
    else {
      let goalDiff = sliderChangeEvent.value - median;
      this.selectedResult = this.league.match.team2.name + " will win by " + goalDiff + " goals";
    }
  }

  onBetClicked(event) {
    console.log(event);

    this.coinsToBet = event;

    let dialogData : ConfirmationDialogInput = {
      cointToBet : this.coinsToBet,
      toNotify: this,
      userId: '1'
    };

    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: dialogData
    });
  }

  private continueWithBet(): void {

  }
}

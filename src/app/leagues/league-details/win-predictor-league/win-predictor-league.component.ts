import { Component, OnInit, Input } from '@angular/core';
import { League } from '../../models/League';
import { MatSliderChange } from '@angular/material/slider';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent, ConfirmationDialogInput, ConfirmationType } from '../confirmation-dialog/confirmation-dialog.component';
import { Notifyable } from '../../../util/Notifyable';
import { UserAnswerService } from '../../user-answer.service';
import { UserChallengeAnswer } from '../../models/UserChallengeAnswer';

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

  matchResultText: string;
  
  private coinsToBet: number;
  private alreadyBetted: boolean;
  private userAnswer : number;
  private userAnswerRaw : UserChallengeAnswer;


  constructor(public dialog: MatDialog, private userAnswerService: UserAnswerService) { }

  ngOnInit() {
    let match = this.league.match;

    this.userAnswer = (this.maxVal + this.minVal)/2;

    this.userAnswerService.getUserAnswerForLeague('1', this.league.id).then(userAnswer =>{
      this.userAnswerRaw = userAnswer;
      let answer : string[]= userAnswer.answerS.split('-')
      this.userAnswer += Number.parseInt(answer[1]) - Number.parseInt(answer[0]);
      this.alreadyBetted = true;
      this.updateSliderText(this.userAnswer);
    });

    if(match.finished){
      let scoreDiff = match.team1Score - match.team2Score;
      if(scoreDiff === 0){
        this.matchResultText = "The match was Draw";
      }
      else if(scoreDiff > 0){
        this.matchResultText = match.team1.name + " won by " + Math.abs(scoreDiff) + " goals";
      }
      else {
        this.matchResultText = match.team2.name + " won by " + Math.abs(scoreDiff) + " goals";
      }
    }
  }

  /**
   * To be called by the modal component to return the result
   * @param result
   */
  notify(result: String) {
    if (result === 'YES') {
      if (this.alreadyBetted) {
        this.continueWithdrawl();
      }
      else {
        this.continueWithBet();
      }
    }
  }

  onSliderChange(sliderChangeEvent: MatSliderChange) {
    this.updateSliderText(sliderChangeEvent.value);
  }

  updateSliderText(value : number) {
    let median = (this.maxVal + this.minVal) / 2;
    this.userAnswer = value;
    if (value === median) {
      this.selectedResult = "match would be DRAW";
    }
    else if (value < median) {
      let goalDiff = median - value;
      this.selectedResult = this.league.match.team1.name + " will win by " + goalDiff + " goals.";
    }
    else {
      let goalDiff = value - median;
      this.selectedResult = this.league.match.team2.name + " will win by " + goalDiff + " goals";
    }
  }

  onBetClicked(event) {
    console.log(event);

    this.coinsToBet = event;

    let dialogData: ConfirmationDialogInput = {
      cointToBet: this.coinsToBet,
      toNotify: this,
      userId: '1',
      type: ConfirmationType.BET
    };

    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: dialogData
    });
  }

  onWithdrawClicked() {
    let dialogData: ConfirmationDialogInput = {
      cointToBet: this.coinsToBet,
      toNotify: this,
      userId: '1',
      type: ConfirmationType.WITHDRAWL
    };

    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: dialogData
    });
  }

  private continueWithBet(): void {
    this.alreadyBetted = true;
  }

  private continueWithdrawl(): void {
    this.userAnswerService.deleteUserAnswer(this.userAnswerRaw.id);
    this.userAnswerRaw = undefined;
    this.updateSliderText((this.maxVal + this.minVal) / 2);
    this.alreadyBetted = false;
  }
}


interface Answer{
  team1Score: number,
  team2Score: number
}
import { Component, OnInit, Input } from '@angular/core';
import { League } from '../../models/League';
import { MatSliderChange } from '@angular/material/slider';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent, ConfirmationDialogInput, ConfirmationType } from '../confirmation-dialog/confirmation-dialog.component';
import { Notifyable } from '../../../util/Notifyable';
import { UserAnswerService } from '../../user-answer.service';
import { UserChallengeAnswer } from '../../../api';
import { UserService } from '../../../user/user.service';

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
  private userAnswer: number;
  private userAnswerRaw: UserChallengeAnswer;
  private userId: string;
  private apiKey: string;
  private selectedGoalDiff: number = 0;


  constructor(public dialog: MatDialog, private userAnswerService: UserAnswerService, private userService: UserService) { }

  ngOnInit() {

    this.userService.getLoginObserver().subscribe(loginResponse => {
      this.userId = loginResponse.userId;
      this.apiKey = loginResponse.apiKey;


      let match = this.league.match;

      this.userAnswer = (this.maxVal + this.minVal) / 2;

      this.userAnswerService.getUserAnswerForLeague(this.userId, this.league.id).then(userAnswer => {
        this.userAnswerRaw = userAnswer;
        this.userAnswer -= Number.parseInt(userAnswer.answerS.toString());
        this.alreadyBetted = true;
        this.coinsToBet = Number.parseInt(userAnswer.coinsBet);
        this.updateSliderText(this.userAnswer);
      });

      if (match.finished) {
        this.league.locked = true;
        let scoreDiff = match.team1Score - match.team2Score;
        if (scoreDiff === 0) {
          this.matchResultText = "The match was Draw";
        }
        else if (scoreDiff > 0) {
          this.matchResultText = match.team1.name + " won by " + Math.abs(scoreDiff) + " goals";
        }
        else {
          this.matchResultText = match.team2.name + " won by " + Math.abs(scoreDiff) + " goals";
        }
      }
    });
    this.userService.checkLogin();

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

  updateSliderText(value: number) {
    let median = (this.maxVal + this.minVal) / 2;
    this.userAnswer = value;
    if (value === median) {
      this.selectedGoalDiff = 0;
      this.selectedResult = "match would be DRAW";
    }
    else if (value < median) {
      let goalDiff = median - value;
      this.selectedGoalDiff = goalDiff;
      this.selectedResult = this.league.match.team1.name + " will win by " + goalDiff + " goals.";
    }
    else {
      let goalDiff = value - median;
      this.selectedGoalDiff = -goalDiff;
      this.selectedResult = this.league.match.team2.name + " will win by " + goalDiff + " goals";
    }
  }

  onBetClicked(coninsBetted) {
    console.log(coninsBetted);

    this.coinsToBet = coninsBetted;

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

    let answer = this.selectedGoalDiff.toString();

    let userAnswer: UserChallengeAnswer = {
      id: null,
      coinsBet: this.coinsToBet.toString(),
      answerType: UserChallengeAnswer.AnswerTypeEnum.SINGLE,
      challengeId: this.league.id.toString(),
      matchId: this.league.match.id.toString(),
      userid: this.userId.toString(),
      answerS: this.selectedGoalDiff.toString()
    };

    this.userAnswerService.createUserAnswer(userAnswer, this.apiKey).then(newUserAnswer => {
      this.userAnswerRaw = newUserAnswer;
    });

    this.alreadyBetted = true;
  }

  private continueWithdrawl(): void {
    this.userAnswerService.deleteUserAnswer(this.userAnswerRaw.id, this.apiKey);
    this.userAnswerRaw = undefined;
    this.updateSliderText((this.maxVal + this.minVal) / 2);
    this.alreadyBetted = false;
  }
}
import { Component, OnInit, Input } from '@angular/core';
import { League } from '../../models/League';
import { Question } from '../../models/Question';
import { LeaguesService } from '../../leagues.service';
import { Notifyable } from '../../../util/Notifyable';
import { ConfirmationDialogInput, ConfirmationDialogComponent, ConfirmationType } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-stat-quiz-league',
  templateUrl: './stat-quiz-league.component.html',
  styleUrls: ['./stat-quiz-league.component.scss']
})
export class StatQuizLeagueComponent implements OnInit, Notifyable<String>  {

  @Input() league: League;

  questions: Question[];

  private coinsToBet : number;

  private alreadyBetted : boolean;

  private answersVisible : boolean = true;

  constructor(private leagueService : LeaguesService, public dialog: MatDialog) { }

  ngOnInit() {
    this.leagueService.getQuestionsForLeague(this.league.id).then(questions=>{
      this.questions = questions;
      questions.forEach(question =>{
        if(question.answer === null){
          this.answersVisible = false;
        }
      })
    });
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

  onBetClicked(event) {
    console.log(event);

    this.coinsToBet = event;

    let dialogData : ConfirmationDialogInput = {
      cointToBet : this.coinsToBet,
      toNotify: this,
      userId: '1',
      type: ConfirmationType.BET
    };

    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: dialogData
    });
  }

  onWithdrawClicked(){
    let dialogData : ConfirmationDialogInput = {
      cointToBet : this.coinsToBet,
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
    this.alreadyBetted = false;
  }

}

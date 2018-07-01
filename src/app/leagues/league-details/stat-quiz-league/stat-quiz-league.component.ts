import { Component, OnInit, Input } from '@angular/core';
import { League } from '../../models/League';
import { LeaguesService } from '../../leagues.service';
import { Notifyable } from '../../../util/Notifyable';
import { ConfirmationDialogInput, ConfirmationDialogComponent, ConfirmationType } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserAnswerService } from '../../user-answer.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UserChallengeAnswer, Question } from '../../../api';
import { UserService } from '../../../user/user.service';

@Component({
  selector: 'app-stat-quiz-league',
  templateUrl: './stat-quiz-league.component.html',
  styleUrls: ['./stat-quiz-league.component.scss']
})
export class StatQuizLeagueComponent implements OnInit, Notifyable<String>  {

  @Input() league: League;

  questions: Question[];

  private coinsToBet: number;

  private alreadyBetted: boolean;

  private answersVisible: boolean = true;

  private userId: String;
  private apiKey: string;

  private userAnswer: UserChallengeAnswer;

  constructor(
    private leagueService: LeaguesService,
    private userAnswerService: UserAnswerService,
    private userService: UserService,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.userService.getLoginObserver().subscribe(loginResponse => {

      this.userId = loginResponse.userId;
      this.apiKey = loginResponse.apiKey;

      this.coinsToBet = 50;

      this.leagueService.getQuestionsForLeague(this.league.id).then(questions => {
        this.questions = questions;
        questions.forEach(question => {
          if (question.answer === null) {
            this.answersVisible = false;
          }
          else {
            this.league.locked = true;
          }
        });

        if (!this.userAnswer) {
          this.userAnswer = {
            id: null,
            answerType: UserChallengeAnswer.AnswerTypeEnum.MULTIPLE,
            coinsBet: this.coinsToBet.toString(),
            challengeId: this.league.id.toString(),
            matchId: this.league.match.id.toString(),
            userid: this.userId.toString(),
            answers: []
          };

          this.questions.forEach(question => {
            this.userAnswer.answers.push(
              {
                questionId: question.id.toString(),
                answer: "false"
              }
            );
          });
        }

        this.userAnswerService.getUserAnswerForLeague(this.userId, this.league.id).then(userAnswer => {
          this.userAnswer = userAnswer;
          this.alreadyBetted = true;
          this.coinsToBet = Number.parseInt(this.userAnswer.coinsBet);
        });

      });

    });

    this.userService.checkLogin()
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

  onAnswerChanged(changeEvent: MatSlideToggleChange) {

    let questionId = changeEvent.source.id;
    let answer = changeEvent.checked;

    let index = this.userAnswer.answers.findIndex(userAnswer => userAnswer.questionId === questionId);
    this.userAnswer.answers[index].answer = (answer) ? "true" : "false";

  }

  getUserAnswerForQuestion(questionId): boolean {
    if (this.userAnswer) {
      let userAnswer = this.userAnswer.answers.find(userAnswer => userAnswer.questionId === questionId);
      if (userAnswer) {
        return userAnswer.answer == "true";
      }
    }
    return false;
  }

  private continueWithBet(): void {
    this.userAnswer.coinsBet = this.coinsToBet.toString();
    this.userAnswerService.createUserAnswer(this.userAnswer, this.apiKey).then(newUserAnswer => {
      this.userAnswer = newUserAnswer;
      this.alreadyBetted = true;
    });
  }

  private continueWithdrawl(): void {
    this.userAnswerService.deleteUserAnswer(this.userAnswer.id, this.apiKey).then(isDeleted => {
      if (isDeleted) {
        this.alreadyBetted = false;
      }
    })
  }

}

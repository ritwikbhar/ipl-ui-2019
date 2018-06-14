import { Injectable } from '@angular/core';
import { UserChallengeAnswer, AnswerType } from './models/UserChallengeAnswer';

@Injectable()
export class UserAnswerService {

  constructor() { }

  public getUserAnswerForLeague(userId:String , leagueId: String): Promise<UserChallengeAnswer> {
    
    return new Promise<UserChallengeAnswer>(resolve => {
      let userAnswer = this.userAnswers.filter(
        userAnswer => userAnswer.leagueId === leagueId && userAnswer.userId === userId
      )[0];
      if(userAnswer){
        resolve(userAnswer);
      }
    });
  }

  public deleteUserAnswer(userAnswerId : String): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      let index = this.userAnswers.findIndex(userAnswer=>userAnswer.id === userAnswerId);
      this.userAnswers.splice(index, 1);
      resolve(true);
    }); 
  }

  private userAnswers : UserChallengeAnswer[] = [
    {
      id: "1",
      userId: "1",
      leagueId: "1",
      matchId: "1",
      answerType: AnswerType.SINGLE,
      coinsBet: 50,
      answerS: '3-1'
    },
    {
      id: "2",
      userId: "1",
      leagueId: "2",
      matchId: "2",
      answerType: AnswerType.MULTIPLE,
      coinsBet: 200,
      answer: [
        {
          questionId: "1",
          answer: true
        },
        {
          questionId: "2",
          answer: false
        },
        {
          questionId: "3",
          answer: true
        }
      ]
    }
  ]

}

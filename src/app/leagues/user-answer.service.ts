import { Injectable } from '@angular/core';
import { UserChallengeAnswer, AnswerType } from './models/UserChallengeAnswer';
import { UserService } from '../user/user.service';

@Injectable()
export class UserAnswerService {

  constructor(private userService : UserService) { }

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
      
      //TODO remove from UI and put to backend
      this.userService.incrementWalletBalance(this.userAnswers[index].coinsBet);

      this.userAnswers.splice(index, 1);
      resolve(true);
    }); 
  }

  public createUserAnswer(userAnswer : UserChallengeAnswer) : Promise<UserChallengeAnswer> {
    return new Promise<UserChallengeAnswer>(resolve => {
      //TODO remove from UI and put to backend
      this.userService.decrementWalletBalance(userAnswer.coinsBet);

      userAnswer.id = (Math.random()*15).toString();
      this.userAnswers.push(userAnswer);
      resolve(userAnswer);
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
      answerS: '2'
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

import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { UserChallengeAnswerService as UserChallengeAnswerApi } from '../api/api/api';
import { UserChallengeAnswer } from '../api';

@Injectable()
export class UserAnswerService {

  constructor(private userService : UserService, private userChallengeAnswerApi : UserChallengeAnswerApi) { }

  public getUserAnswerForLeague(userId:String , leagueId: String): Promise<UserChallengeAnswer> {
    
    return new Promise<UserChallengeAnswer>(resolve => {

      this.userChallengeAnswerApi.getUserChallengeAnswers(userId.toString(), leagueId.toString())
        .subscribe(filteredUserChallengeAnswers => {

          //Temporary fix as server response is not proper
          filteredUserChallengeAnswers = filteredUserChallengeAnswers.filter(answer => answer.challengeId == leagueId);

          if(filteredUserChallengeAnswers.length >= 1){
            resolve(filteredUserChallengeAnswers[0]);
          }
          
      });
    });
  }

  public getUserAnswers(userId: String): Promise<UserChallengeAnswer[]> {

    return this.userChallengeAnswerApi.getUserChallengeAnswers(userId.toString()).toPromise();
  }

  public deleteUserAnswer(userAnswerId : String, apiKey : string): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.userChallengeAnswerApi.deleteUserChallengeAnswer(userAnswerId.toString(), apiKey).subscribe(isDeleted => {
        resolve(isDeleted);
      });
    }); 
  }

  public createUserAnswer(userAnswer : UserChallengeAnswer, apiKey : string) : Promise<UserChallengeAnswer> {
    return new Promise<UserChallengeAnswer>(resolve => {
      this.userChallengeAnswerApi.createUserChallengeAnswer(userAnswer, apiKey).subscribe(newUserAnswer => {
        resolve(newUserAnswer);
      });
    });
  }
}

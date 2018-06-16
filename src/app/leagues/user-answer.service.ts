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

          if(filteredUserChallengeAnswers.length >= 1){
            resolve(filteredUserChallengeAnswers[0]);
          }
          
      });
    });
  }

  public deleteUserAnswer(userAnswerId : String): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.userChallengeAnswerApi.deleteUserChallengeAnswer(userAnswerId.toString()).subscribe(isDeleted => {
        resolve(isDeleted);
      });
    }); 
  }

  public createUserAnswer(userAnswer : UserChallengeAnswer) : Promise<UserChallengeAnswer> {
    return new Promise<UserChallengeAnswer>(resolve => {
      this.userChallengeAnswerApi.createUserChallengeAnswer(userAnswer).subscribe(newUserAnswer => {
        resolve(newUserAnswer);
      });
    });
  }
}

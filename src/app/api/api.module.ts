import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Configuration } from './configuration';

import { ChallengeService } from './api/challenge.service';
import { ImagesService } from './api/images.service';
import { MatchService } from './api/match.service';
import { PostsService } from './api/posts.service';
import { QuestionsService } from './api/questions.service';
import { TeamsService } from './api/teams.service';
import { UserService } from './api/user.service';
import { UserChallengeAnswerService } from './api/userChallengeAnswer.service';

@NgModule({
  imports:      [ CommonModule, HttpClientModule ],
  declarations: [],
  exports:      [],
  providers: [
    ChallengeService,
    ImagesService,
    MatchService,
    PostsService,
    QuestionsService,
    TeamsService,
    UserService,
    UserChallengeAnswerService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        }
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import your base AppModule only.');
        }
    }
}

export * from './challenge.service';
import { ChallengeService } from './challenge.service';
export * from './match.service';
import { MatchService } from './match.service';
export * from './user.service';
import { UserService } from './user.service';
export * from './userChallengeAnswer.service';
import { UserChallengeAnswerService } from './userChallengeAnswer.service';
export const APIS = [ChallengeService, MatchService, UserService, UserChallengeAnswerService];

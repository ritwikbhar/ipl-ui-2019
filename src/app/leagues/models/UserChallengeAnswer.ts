import { UserAnswer } from "./UserAnswer";

export interface UserChallengeAnswer {
    id: string,
    userId: String,
    matchId: String,
    leagueId: String,
    answerS?: String,
    coinsBet: number,
    answerType: AnswerType,
    answer?: UserAnswer[]
}

export enum AnswerType {
    SINGLE,
    MULTIPLE
}
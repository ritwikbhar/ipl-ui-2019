/**
 * Sports fever
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * Contact: Shankarmurthy.bhat@in.bosch.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface Challenge {
    id?: string;
    name?: string;
    date?: string;
    matchId?: string;
    ctype?: Challenge.CtypeEnum;
}
export namespace Challenge {
    export type CtypeEnum = 'WIN_PREDICTOR' | 'STAT_QUIZ';
    export const CtypeEnum = {
        WINPREDICTOR: 'WIN_PREDICTOR' as CtypeEnum,
        STATQUIZ: 'STAT_QUIZ' as CtypeEnum
    }
}

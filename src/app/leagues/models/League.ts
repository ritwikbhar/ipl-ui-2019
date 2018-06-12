import { Match } from "../../match/models/Match";

export interface League {
    id: string,
    name: string,
    date: string,
    match: Match,
    cType: string,
    locked: boolean
}
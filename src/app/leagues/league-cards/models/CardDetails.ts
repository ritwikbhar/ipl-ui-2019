import { League } from "../../models/League";

export interface CardDetails {
    leagueId: String,
    title: String,
    date: String,
    homeTeam: CardTeam,
    awayTeam: CardTeam,
    league: League
}

export interface CardTeam {
    name: String,
    shortName: String,
    flag: String
}
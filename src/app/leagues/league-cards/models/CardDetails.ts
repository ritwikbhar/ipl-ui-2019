
export interface CardDetails {
    leagueId: String,
    title: String,
    date: String,
    homeTeam: CardTeam,
    awayTeam: CardTeam
}

export interface CardTeam {
    name: String,
    shortName: String,
    flag: String
}
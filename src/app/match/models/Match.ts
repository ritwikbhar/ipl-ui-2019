import { Team } from "./Team";
import { Stadium } from "./Stadium";

export interface Match {
    id: String,
    name: String,
    date: String,
    team1: Team,
    team2: Team,
    stadium?: Stadium,
    team1Score: number,
    team2Score: number,
    finished: boolean
}
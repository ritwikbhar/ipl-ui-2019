import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.scss']
})
export class HistoryCardComponent implements OnInit {

  history = [
    {
      match: "GER vs FRA",
      league: "Win predictor",
      bet: 50,
      won: 100
    },
    {
      match: "GER vs FRA",
      league: "Stat quiz",
      bet: 50,
      won: -50
    },
    {
      match: "SPA vs FRA",
      league: "Win predictor",
      bet: 100,
      won: 400
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';

import { CardDetails } from '../models/CardDetails';

@Component({
  selector: 'app-league-card',
  templateUrl: './league-card.component.html',
  styleUrls: ['./league-card.component.scss']
})
export class LeagueCardComponent implements OnInit {

  @Input() cardDetails:CardDetails;

  constructor() { }

  ngOnInit() {
  }

}

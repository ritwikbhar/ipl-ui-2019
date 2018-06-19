import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../match/match.service';
import { MatchGroup } from '../../match/models/MatchGroup';

@Component({
  selector: 'app-fifa-schedule',
  templateUrl: './fifa-schedule.component.html',
  styleUrls: ['./fifa-schedule.component.scss']
})
export class FifaScheduleComponent implements OnInit {

  title ="Fifa Schedule";
  matchGroups:MatchGroup[] = [];

  constructor(private matchService : MatchService) { }

  ngOnInit() {
    this.matchService.getGroupedMatches().then(matchGroups=>{
      this.matchGroups = matchGroups;
    });
  }

}

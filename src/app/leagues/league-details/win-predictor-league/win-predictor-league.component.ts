import { Component, OnInit, Input } from '@angular/core';
import { League } from '../../models/League';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-win-predictor-league',
  templateUrl: './win-predictor-league.component.html',
  styleUrls: ['./win-predictor-league.component.scss']
})
export class WinPredictorLeagueComponent implements OnInit {

  @Input() league: League;

  maxVal = 20;
  minVal = 0;

  coinsBet: number = 50;
  selectedResult: string = "match would be DRAW";

  constructor() { }

  ngOnInit() {
  }

  onSliderChange(sliderChangeEvent: MatSliderChange) {
    let median = (this.maxVal + this.minVal) / 2;
    if (sliderChangeEvent.value === median) {
      this.selectedResult = "match would be DRAW";
    }
    else if (sliderChangeEvent.value < median) {
      let goalDiff = median - sliderChangeEvent.value;
      this.selectedResult = this.league.match.team1.name + " will win by " + goalDiff + " goals.";
    }
    else {
      let goalDiff = sliderChangeEvent.value - median;
      this.selectedResult = this.league.match.team2.name + " will win by " + goalDiff + " goals";
    }
  }

  increaseBet() {
    this.coinsBet += 25;
  }

  decreaseBet() {
    if (this.coinsBet > 25) {
      this.coinsBet -= 25;
    }
  }
}

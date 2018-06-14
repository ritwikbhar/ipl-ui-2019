import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-bet-btn',
  templateUrl: './bet-btn.component.html',
  styleUrls: ['./bet-btn.component.scss']
})
export class BetBtnComponent implements OnInit {

  @Input() coinsBet: number;

  @Output() betted: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if(!this.coinsBet){
      this.coinsBet = 50;
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

  onButtonClick() {
    if (this.betted) {
      this.betted.emit(this.coinsBet);
    }
  }

}

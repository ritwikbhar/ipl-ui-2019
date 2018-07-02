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
    if(this.coinsBet < 200){
      this.coinsBet += 25;
    }
    else if (this.coinsBet < 500) {
      this.coinsBet += 75;
    }
    else if(this.coinsBet < 1000) {
      this.coinsBet += 100;
    }
    else if(this.coinsBet < 10000) {
      this.coinsBet += 500;
    }
    else {
      this.coinsBet += 1000;
    }
  }

  decreaseBet() {
    if(this.coinsBet <= 25){
      return;
    }

    if(this.coinsBet < 200){
      this.coinsBet -= 25;
    }
    else if (this.coinsBet < 500) {
      this.coinsBet -= 75;
    }
    else if(this.coinsBet < 1000) {
      this.coinsBet -= 100;
    }
    else if(this.coinsBet < 10000) {
      this.coinsBet -= 500;
    }
    else {
      this.coinsBet -= 1000;
    }
  }

  onButtonClick() {
    if (this.betted) {
      this.betted.emit(this.coinsBet);
    }
  }

}

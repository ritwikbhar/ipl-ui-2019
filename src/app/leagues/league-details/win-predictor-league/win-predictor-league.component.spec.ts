import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinPredictorLeagueComponent } from './win-predictor-league.component';

describe('WinPredictorLeagueComponent', () => {
  let component: WinPredictorLeagueComponent;
  let fixture: ComponentFixture<WinPredictorLeagueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinPredictorLeagueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinPredictorLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

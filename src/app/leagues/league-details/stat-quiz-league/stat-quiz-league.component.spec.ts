import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatQuizLeagueComponent } from './stat-quiz-league.component';

describe('StatQuizLeagueComponent', () => {
  let component: StatQuizLeagueComponent;
  let fixture: ComponentFixture<StatQuizLeagueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatQuizLeagueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatQuizLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

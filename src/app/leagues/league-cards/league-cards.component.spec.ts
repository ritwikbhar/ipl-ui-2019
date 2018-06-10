import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueCardsComponent } from './league-cards.component';

describe('LeagueCardsComponent', () => {
  let component: LeagueCardsComponent;
  let fixture: ComponentFixture<LeagueCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

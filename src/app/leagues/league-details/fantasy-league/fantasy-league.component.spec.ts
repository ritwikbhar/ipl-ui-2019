import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FantasyLeagueComponent } from './fantasy-league.component';

describe('FantasyLeagueComponent', () => {
  let component: FantasyLeagueComponent;
  let fixture: ComponentFixture<FantasyLeagueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FantasyLeagueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FantasyLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLeagueComponent } from './top-league.component';

describe('TopLeagueComponent', () => {
  let component: TopLeagueComponent;
  let fixture: ComponentFixture<TopLeagueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopLeagueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLeagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

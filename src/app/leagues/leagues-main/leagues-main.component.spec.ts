import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguesMainComponent } from './leagues-main.component';

describe('LeaguesMainComponent', () => {
  let component: LeaguesMainComponent;
  let fixture: ComponentFixture<LeaguesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaguesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaguesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

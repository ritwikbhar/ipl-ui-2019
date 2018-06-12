import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetingTeamsComponent } from './competing-teams.component';

describe('CompetingTeamsComponent', () => {
  let component: CompetingTeamsComponent;
  let fixture: ComponentFixture<CompetingTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetingTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetingTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

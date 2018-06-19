import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FifaScheduleComponent } from './fifa-schedule.component';

describe('FifaScheduleComponent', () => {
  let component: FifaScheduleComponent;
  let fixture: ComponentFixture<FifaScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FifaScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FifaScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

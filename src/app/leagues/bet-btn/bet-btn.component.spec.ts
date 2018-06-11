import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetBtnComponent } from './bet-btn.component';

describe('BetBtnComponent', () => {
  let component: BetBtnComponent;
  let fixture: ComponentFixture<BetBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

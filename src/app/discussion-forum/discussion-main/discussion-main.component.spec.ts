import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscussionMainComponent } from './discussion-main.component';

describe('DiscussionMainComponent', () => {
  let component: DiscussionMainComponent;
  let fixture: ComponentFixture<DiscussionMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscussionMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscussionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

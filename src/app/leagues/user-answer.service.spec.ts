import { TestBed, inject } from '@angular/core/testing';

import { UserAnswerService } from './user-answer.service';

describe('UserAnswerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAnswerService]
    });
  });

  it('should be created', inject([UserAnswerService], (service: UserAnswerService) => {
    expect(service).toBeTruthy();
  }));
});

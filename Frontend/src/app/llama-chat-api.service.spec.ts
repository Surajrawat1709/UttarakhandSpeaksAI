import { TestBed } from '@angular/core/testing';

import { LlamaChatApiService } from './llama-chat-api.service';

describe('LlamaChatApiService', () => {
  let service: LlamaChatApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LlamaChatApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

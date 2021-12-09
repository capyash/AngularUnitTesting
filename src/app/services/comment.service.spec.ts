import { TestBed } from '@angular/core/testing';
import { APIService } from './api.service';

import { CommentService } from './comment.service';

describe('CommentService', () => {
  let service: CommentService;
  let apiSpy = jasmine.createSpyObj<APIService>('APIService', [
    'httpGet',
    'httpPatch', 'httpPost',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        {
          provide: APIService,
          useValue: apiSpy
        }
      ]
    });
    service = TestBed.inject(CommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

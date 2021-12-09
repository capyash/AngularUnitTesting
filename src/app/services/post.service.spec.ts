import { TestBed } from '@angular/core/testing';
import { APIService } from './api.service';

import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
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
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

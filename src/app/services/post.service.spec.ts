import { TestBed } from '@angular/core/testing';
import { delay, of } from 'rxjs';
import { Post } from '../models/post';
import { APIService } from './api.service';

import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let apiSpy = jasmine.createSpyObj<APIService>('APIService', [
    'httpGet',
    'httpPatch',
    'httpPost',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: APIService,
          useValue: apiSpy,
        },
      ],
    });
    service = TestBed.inject(PostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a new post when asked', () => {
    apiSpy.httpPost.and.returnValue(
      of({ id: 1, title: 'First', authorId: 1 } as Post).pipe(delay(500))
    );
    let response: boolean | null = null;
    service
      .createPost({
        title: 'SDASD',
        authorId: 1,
      })
      .subscribe({
        next: (res) => {
          response = res;
          expect(response).toBe(true);
        },
      });
  });
});

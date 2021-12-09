import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

import { PostDetailComponent } from './post-detail.component';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;

  const activatedRouteManualMock = {
    snapshot: {
      params: {
        id: 1,
      },
    },
  };
  let postServiceSpy = jasmine.createSpyObj<PostService>('PostService', [
    'getPostList',
    'getPost',
    'createPost',
  ]);

  postServiceSpy.getPost.and.returnValue(
    of({
      id: 1,
      title: 'First',
      authorId: 1,
    } as Post)
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteManualMock,
        },
        {
          provide: PostService,
          useValue: postServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

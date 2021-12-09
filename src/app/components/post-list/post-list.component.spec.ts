import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

import { PostListComponent } from './post-list.component';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let postServiceSpy = jasmine.createSpyObj<PostService>('PostService', [
    'getPostList',
    'getPost',
    'createPost',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostListComponent],
      providers: [
        {
          provide: PostService,
          useValue: postServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});

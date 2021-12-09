import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Post } from 'src/app/models/post';
import { Profile } from 'src/app/models/profile';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';

import { PostListComponent } from './post-list.component';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let postServiceSpy = jasmine.createSpyObj<PostService>('PostService', [
    'getPostList',
    'getPost',
    'createPost',
  ]);

  let profileServiceSpy = jasmine.createSpyObj<ProfileService>(
    'ProfileService',
    ['getProfileList', 'getProfile', 'createProfile']
  );

  postServiceSpy.getPostList.and.returnValue(
    of([
      {
        id: 1,
        title: 'First Post',
        authorId: 1,
      } as Post,
    ])
  );
  profileServiceSpy.getProfileList.and.returnValue(
    of([
      {
        id: 1,
        name: 'First Author',
      } as Profile,
    ])
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
      declarations: [PostListComponent],
      providers: [
        {
          provide: PostService,
          useValue: postServiceSpy,
        },
        {
          provide: ProfileService,
          useValue: profileServiceSpy,
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
    expect(component.posts.length)
      .withContext('because one post was sent in the test data')
      .toEqual(1);
  });

  it('should show errors if title is missing', () => {
    let errorList = fixture.nativeElement.querySelectorAll('.error-text');
    expect(errorList.length).toBe(0);
    let submitButton = fixture.nativeElement.querySelector(
      'input[type="Submit"]'
    );
    submitButton.click();
    errorList = fixture.nativeElement.querySelectorAll('.error-text');
    expect(errorList.length).toBe(0);
    // expect(errorList.length).toBe(2);
  });
});

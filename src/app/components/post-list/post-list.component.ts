import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Subject, takeUntil } from 'rxjs';
import { Post } from 'src/app/models/post';
import { Profile } from 'src/app/models/profile';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  public profiles: Profile[] = [];

  private destroy$ = new Subject<boolean>();

  public newPostForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    authorId: new FormControl(null, [Validators.required]),
  });

  constructor(
    public postService: PostService,
    public profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.getPosts();
    this.getProfiles();
  }

  public ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public getPosts(): void {
    this.postService
      .getPostList()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (posts: Post[]) => {
          this.posts = posts;
        },
      });
  }

  public getProfiles(): void {
    this.profileService
      .getProfileList()
      .pipe()
      .subscribe({
        next: (profiles: Profile[]) => {
          this.profiles = profiles;
        },
      });
  }

  public createPost(): void {
    this.newPostForm.markAsDirty();
    if (this.newPostForm.valid) {
      this.postService
        .createPost(this.newPostForm.value)
        .pipe(
          takeUntil(this.destroy$),
          map((x) => {
            if (x) {
              this.getPosts();
            }
          })
        )
        .subscribe();
    } else {
      console.log(this.newPostForm);
    }
  }

  public getProfileName(id: number): string {
    return this.profiles.find((x) => x.id == id)?.name ?? 'User Not Found';
  }

  public getFormControl(name: string) {
    return this.newPostForm.controls[name];
  }
}

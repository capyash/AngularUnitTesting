import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit, OnDestroy {
  constructor(
    public router: Router,
    public activedRoute: ActivatedRoute,
    public postService: PostService
  ) {}

  post: Post | undefined;

  private destroy$ = new Subject<boolean>();

  public ngOnInit(): void {
    this.postService
      .getPost(this.activedRoute.snapshot.params['id'])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (val: Post) => {
          this.post = val;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  public ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}

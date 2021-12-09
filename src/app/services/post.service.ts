import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../models/post';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private apiService: APIService) {}

  public getPostList(): Observable<Post[]> {
    return this.apiService.httpGet<Post[]>('posts');
  }

  public getPost(id: number): Observable<Post> {
    return this.apiService.httpGet<Post>(`post/${id}`);
  }

  public createPost(Post: Partial<Post>): Observable<boolean> {
    return this.apiService
      .httpPost<Post>('posts', Post)
      .pipe(map((res: Post) => (res ? true : false)));
  }

  public updatePost(Post: Partial<Post>): Observable<boolean> {
    if (Post.id == null) {
      throw new Error('Cannot update without ID');
    }
    return this.apiService
      .httpPatch<Post>(`posts/${Post.id}`, Post)
      .pipe(map((res: Post) => (res ? true : false)));
  }
}

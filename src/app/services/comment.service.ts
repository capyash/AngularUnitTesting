import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { Comment } from '../models/comment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private apiService: APIService) {}

  public getCommentList(): Observable<Comment[]> {
    return this.apiService.httpGet<Comment[]>('comments');
  }

  public getComment(id: number): Observable<Comment> {
    return this.apiService.httpGet<Comment>(`comments/${id}`);
  }

  public setComment(Comment: Partial<Comment>): Observable<boolean> {
    return this.apiService
      .httpPost<Comment>('posts', Comment)
      .pipe(map((res: Comment) => (res ? true : false)));
  }

  public updateComment(Comment: Partial<Comment>): Observable<boolean> {
    if (Comment.id == null) {
      throw new Error('Cannot update without ID');
    }
    return this.apiService
      .httpPatch<Comment>(`posts/${Comment.id}`, Comment)
      .pipe(map((res: Comment) => (res ? true : false)));
  }
}

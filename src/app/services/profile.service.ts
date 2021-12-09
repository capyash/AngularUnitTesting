import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Profile } from '../models/profile';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private apiService: APIService) {}

  public getProfileList(): Observable<Profile[]> {
    return this.apiService.httpGet<Profile[]>('profiles');
  }

  public getProfile(id: number): Observable<Profile> {
    return this.apiService.httpGet<Profile>(`profile/${id}`);
  }

  public createProfile(profile: Partial<Profile>): Observable<boolean> {
    return this.apiService
      .httpPost<Profile>('posts', profile)
      .pipe(map((res: Profile) => (res ? true : false)));
  }

  public updateProfile(profile: Partial<Profile>): Observable<boolean> {
    if (profile.id == null) {
      throw new Error('Cannot update without ID');
    }
    return this.apiService
      .httpPatch<Profile>(`posts/${profile.id}`, profile)
      .pipe(map((res: Profile) => (res ? true : false)));
  }
}

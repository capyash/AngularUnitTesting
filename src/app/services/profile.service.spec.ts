import { TestBed } from '@angular/core/testing';
import { APIService } from './api.service';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
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
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { APIService } from './api.service';

describe('APIService', () => {
  let service: APIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // imports:[
      //   HttpClientTestingModule
      // ]
      // providers:[
      //   {
      //     provide: HttpClientTe
      //   }
      // ]
    });
    service = TestBed.inject(APIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

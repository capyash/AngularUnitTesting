import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  private apiRoot = " http://localhost:3000/"

  public httpGet<T = any>(url: string): Observable<T> {
    return this.http.get<T>(this.apiRoot + url);
  }

  public httpPost<T = any>(url: string, body: any): Observable<T> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json')
    return this.http.post<T>(this.apiRoot + url, body, { headers });
  }

  public httpPatch<T = any>(url: string, body: any): Observable<T> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json')
    return this.http.patch<T>(this.apiRoot + url, body, { headers });
  }

}

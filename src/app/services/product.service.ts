import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonConverterService {
  private apiUrl = 'http://127.0.0.1:5000/convert';

  constructor(private http: HttpClient) {}

  convertData(data: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { data });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private api_url: string = "http://localhost:4200/api"  // Replace with your actual FastAPI URL

  constructor(private http: HttpClient) { }

  getMessage(): Observable<any> {
    return this.http.get<any>(this.api_url);
  }
}

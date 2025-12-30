import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnalysisServices {
  private API_URL = 'http://localhost:3000/api/analysis';
  constructor(private http: HttpClient) { }

  getMyAnalysis() {
    return this.http.get(`${this.API_URL}/history`)
  }
}

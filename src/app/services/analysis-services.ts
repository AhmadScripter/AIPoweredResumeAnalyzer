import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnalysisServices {
  private API_URL = 'http://localhost:3000/api/analysis';
  private JD_API_URL = 'http://localhost:3000/api/jd'
  constructor(private http: HttpClient) { }

  getMyAnalysis() {
    return this.http.get(`${this.API_URL}/history`)
  }

  getAnalysisById(id: string) {
    return this.http.get(`${this.API_URL}/${id}`)
  }

  analyze(data: any) {
    return this.http.post(`${this.JD_API_URL}/analyze`, data)
  }
}

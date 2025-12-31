import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  private API_URL = 'http://localhost:3000/api/resume';
  constructor(private http: HttpClient) { }

  getMyResumes() {
    return this.http.get(`${this.API_URL}/my`)
  }
  uploadResume(file: File) {
    const formData = new FormData();
    formData.append('resume', file)
    return this.http.post(`${this.API_URL}/upload`, formData)
  }
}
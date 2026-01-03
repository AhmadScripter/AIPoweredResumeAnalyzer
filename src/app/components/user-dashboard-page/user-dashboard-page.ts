import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { ResumeService } from '../../services/resume-service';
import { AnalysisServices } from '../../services/analysis-services';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-user-dashboard-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-dashboard-page.html',
  styleUrl: './user-dashboard-page.css',
})
export class UserDashboardPage implements OnInit {
  userName = '';
  bestMatch = 0;
  lastAnalysisDate = '';

  resumes: any[] = [];
  analysisHistory: any[] = [];

  constructor(
    private resumeService: ResumeService,
    private analysisService: AnalysisServices,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadResumes();
    this.loadAnalysis();
    this.loadProfile();
  }

  calculateStats() {
    if (this.analysisHistory.length > 0) {
      this.bestMatch = Math.max(
        ...this.analysisHistory.map(a => a.matchPercentage)
      );

      if (!this.analysisHistory || this.analysisHistory.length === 0) {
        return;
      }
      const sorted = [...this.analysisHistory].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      this.bestMatch = Math.max(...sorted.map(a => a.matchPercentage));
      const last = sorted[sorted.length - 1];
      this.lastAnalysisDate = new Date(last.createdAt)
        .toLocaleDateString('en-GB');

      this.cdr.markForCheck();
    }
  }
  loadResumes() {
    this.resumeService.getMyResumes().subscribe((res: any) => {
      this.resumes = res.resumes;
      this.cdr.markForCheck();
    });
  }

  loadAnalysis() {
    this.analysisService.getMyAnalysis().subscribe((res: any) => {
      this.analysisHistory = res.analysis;
      this.calculateStats();
      this.cdr.markForCheck();
    });
  }

  viewAnalysis(id: string) {
    this.router.navigate(['/analysis-result', id]);
  }

  loadProfile() {
    return this.authService.getProfile().subscribe((res: any) => {
      this.userName = res.user.name;
      this.cdr.markForCheck();
    })
  }

}

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ResumeService } from '../../services/resume-service';
import { AnalysisServices } from '../../services/analysis-services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-description-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './job-description-page.html',
  styleUrl: './job-description-page.css',
})
export class JobDescriptionPage implements OnInit {
  resumes: any[] = [];
  selectedResumeId = '';

  jobTitle = '';
  companyName = '';
  jobDescription = '';

  isAnalyzing = false;

  constructor(private resumeService: ResumeService, private analysisService: AnalysisServices, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.resumeService.getMyResumes().subscribe((res: any) => {
      this.resumes = res.resumes;
      this.cdr.detectChanges();
    });
  }

  analyze() {
    this.isAnalyzing = true;

    const payload = {
      resumeId: this.selectedResumeId,
      jdText: this.jobDescription,
      jobTitle: this.jobTitle,
      company: this.companyName
    };

    this.analysisService.analyze(payload).subscribe({
      next: (res: any) => {
        this.isAnalyzing = false;
        console.log('Analysis result', res);
        this.router.navigate(['/analysis-result', res.analysisId]);
      },
      error: (err) => {
        this.isAnalyzing = false;
        console.error(err);
        alert('Analysis failed');
      }
    });
  }
}

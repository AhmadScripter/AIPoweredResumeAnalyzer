import { Component } from '@angular/core';
import { ResumeService } from '../../services/resume-service';
import { AnalysisServices } from '../../services/analysis-services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-description-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './job-description-page.html',
  styleUrl: './job-description-page.css',
})
export class JobDescriptionPage {
  resumes: any[] = [];
  selectedResumeId = '';

  jobTitle = '';
  companyName = '';
  jobDescription = '';

  isAnalyzing = false;

  constructor(private resumeService: ResumeService, private analysisService: AnalysisServices) { }

  ngOnInit() {
    this.resumeService.getMyResumes().subscribe((res: any) => {
      this.resumes = res.resumes;
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
      },
      error: (err) => {
        this.isAnalyzing = false;
        console.error(err);
        alert('Analysis failed');
      }
    });
  }
}

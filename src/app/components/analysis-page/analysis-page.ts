import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { jsPDF } from 'jspdf';
import { AnalysisServices } from '../../services/analysis-services';

@Component({
  selector: 'app-analysis-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './analysis-page.html',
  styleUrl: './analysis-page.css',
})
export class AnalysisPage implements OnInit {
  matchPercentage = 0;
  matchedSkills: string[] = [];
  missingSkills: string[] = [];
  suggestions: string[] = [];
  analysisId = '';

  constructor(private router: Router, private analysisService: AnalysisServices, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.analysisId = this.route.snapshot.paramMap.get('id')!;

    if (!this.analysisId) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.loadAnalysis();
  }
  loadAnalysis() {
    this.analysisService.getAnalysisById(this.analysisId)
      .subscribe((res: any) => {
        console.log(res);
        this.matchPercentage = res.matchPercentage || 0;
        this.matchedSkills = res.matchedSkills || [];
        this.missingSkills = res.missingSkills || [];
        this.generateSuggestions();
        this.cdr.detectChanges();
      }, err => {
        console.error(err);
        this.router.navigate(['/dashboard']);
      });
  }
  generateSuggestions() {
    this.suggestions = this.missingSkills.map(
      s => `Consider adding ${s} to strengthen your resume.`
    );
  }
  downloadReport() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Resume Analysis Report', 14, 20);

    doc.setFontSize(12);
    doc.text(`Match Percentage: ${this.matchPercentage}%`, 14, 35);

    doc.text('Matched Skills:', 14, 50);
    this.matchedSkills.forEach((s, i) => {
      doc.text(`- ${s}`, 18, 60 + i * 8);
    });

    let y = 60 + this.matchedSkills.length * 8 + 10;

    doc.text('Missing Skills:', 14, y);
    this.missingSkills.forEach((s, i) => {
      doc.text(`- ${s}`, 18, y + 10 + i * 8);
    });

    y += 20 + this.missingSkills.length * 8;

    doc.text('AI Suggestions:', 14, y);
    this.suggestions.forEach((s, i) => {
      doc.text(`- ${s}`, 18, y + 10 + i * 8);
    });

    doc.save('resume-analysis-report.pdf');
  }

}

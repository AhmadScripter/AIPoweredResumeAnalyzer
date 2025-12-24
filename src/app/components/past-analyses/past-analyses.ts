import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface Analysis {
  jobTitle: string;
  matchScore: number;
  date1: string;
  date2: string;
}
@Component({
  selector: 'app-past-analyses',
  imports: [CommonModule],
  templateUrl: './past-analyses.html',
  styleUrl: './past-analyses.css',
})
export class PastAnalyses {
  analyses: Analysis[] = [
    { jobTitle: 'Company', matchScore: 86, date1: '2024-07-20', date2: '2024-07-21' },
    { jobTitle: 'Mech Sors', matchScore: 58, date1: '2024-07-18', date2: '2024-07-19' },
    { jobTitle: 'Sath Sote', matchScore: 35, date1: '2024-07-15', date2: '2024-07-16' }
  ];

  getScoreClass(score: number): string {
    if (score >= 70) return 'score-green';
    if (score >= 50) return 'score-yellow';
    return 'score-gray';
  }

}

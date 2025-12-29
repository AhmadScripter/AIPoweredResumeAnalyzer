import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard-page',
  imports: [CommonModule],
  templateUrl: './user-dashboard-page.html',
  styleUrl: './user-dashboard-page.css',
})
export class UserDashboardPage {
  userName = 'Ahmad';

  stats = {
    resumes: 2,
    jobs: 5,
    bestMatch: 78,
    lastDate: '26 Dec 2025'
  };

  recentAnalyses = [
    {
      resume: 'Resume.pdf',
      score: 72,
      skills: 6,
      date: '26 Dec'
    },
    {
      resume: 'Frontend_CV.pdf',
      score: 68,
      skills: 5,
      date: '24 Dec'
    }
  ];
}

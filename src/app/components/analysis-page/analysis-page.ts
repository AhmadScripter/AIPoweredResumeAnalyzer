import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-analysis-page',
  imports: [CommonModule],
  templateUrl: './analysis-page.html',
  styleUrl: './analysis-page.css',
})
export class AnalysisPage {
  matchPercentage = 52;

  matchedSkills = [
    'React',
    'Node.js',
    'AWS',
    'JavaScript',
    'REST API'
  ];

  missingSkills = [
    'Docker',
    'Kubernetes',
    'CI/CD',
    'Unit Testing'
  ];

  suggestions = [
    'Improve experience section with quantifiable results.',
    'Add keywords like Microservices and Cloud Deployment.',
    'Tailor your summary to mention DevOps.'
  ];

}

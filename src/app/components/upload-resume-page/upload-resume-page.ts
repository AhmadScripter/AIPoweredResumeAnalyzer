import { ChangeDetectorRef, Component } from '@angular/core';
import { ResumeService } from '../../services/resume-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-resume-page',
  imports: [],
  templateUrl: './upload-resume-page.html',
  styleUrl: './upload-resume-page.css',
})
export class UploadResumePage {
  isUploading = false;
  selectedFile!: File | null;
  uploadedFile: any = null;

  constructor(private resumeService: ResumeService, private router: Router, private cdr: ChangeDetectorRef) { }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.uploadedFile = null;
    }
  }

  upload() {
    if (!this.selectedFile) return;

    this.isUploading = true;
    this.cdr.markForCheck();

    this.resumeService.uploadResume(this.selectedFile).subscribe({
      next: (res: any) => {
        this.isUploading = false;
        this.uploadedFile = res.resume;
        this.selectedFile = null;
        this.cdr.markForCheck();
        this.router.navigate(['/job-description']);
      },
      error: () => {
        this.isUploading = false;
        this.cdr.markForCheck();
        alert('Upload failed');
      }
    });
  }

}
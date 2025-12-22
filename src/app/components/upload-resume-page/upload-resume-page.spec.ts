import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadResumePage } from './upload-resume-page';

describe('UploadResumePage', () => {
  let component: UploadResumePage;
  let fixture: ComponentFixture<UploadResumePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadResumePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadResumePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastAnalyses } from './past-analyses';

describe('PastAnalyses', () => {
  let component: PastAnalyses;
  let fixture: ComponentFixture<PastAnalyses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastAnalyses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastAnalyses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

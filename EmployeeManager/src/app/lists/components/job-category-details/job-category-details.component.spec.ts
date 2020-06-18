import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCategoryDetailsComponent } from './job-category-details.component';

describe('JobCategoryDetailsComponent', () => {
  let component: JobCategoryDetailsComponent;
  let fixture: ComponentFixture<JobCategoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCategoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

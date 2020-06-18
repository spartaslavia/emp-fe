import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCategoriesListComponent } from './job-categories-list.component';

describe('JobCategoriesListComponent', () => {
  let component: JobCategoriesListComponent;
  let fixture: ComponentFixture<JobCategoriesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCategoriesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

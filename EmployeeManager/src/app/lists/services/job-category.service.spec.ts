import { TestBed } from '@angular/core/testing';

import { JobCategoryService } from './job-category.service';

describe('JobCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobCategoryService = TestBed.get(JobCategoryService);
    expect(service).toBeTruthy();
  });
});

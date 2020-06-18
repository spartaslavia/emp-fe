import { Component, OnInit } from '@angular/core';
import { Subscription, NEVER } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Country } from '../../models/country';
import { finalize, catchError } from 'rxjs/operators';
import { JobCategoryService } from '../../services/job-category.service';
import { JobCategory } from '../../models/jobCategory';

@Component({
  selector: 'app-job-category-details',
  templateUrl: './job-category-details.component.html',
  styleUrls: ['./job-category-details.component.css']
})
export class JobCategoryDetailsComponent implements OnInit {

    private subs: Subscription[] = [];
    loading = false;
    submitted = false;
    generalForm: FormGroup;
    cntrId: string;

    constructor(
        private fb: FormBuilder,
        private jobCategoryService: JobCategoryService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.loading = true;
        this.cntrId = this.route.snapshot.queryParams['id'];
        this.initForm();

        this.loading = false;
    }

    initForm() {
        this.generalForm = this.fb.group({
            title: ['', Validators.required],
        });

        this.setDataToForm(this.cntrId);
    }

    setDataToForm(id: string) {
        this.jobCategoryService.getJobCategory(id).subscribe((data: JobCategory) => {
            if (data) {
                this.generalForm.get('title').setValue(data.title);
            }
        })
    }

    setCounryObject(fb: FormGroup, item: JobCategory) {
        if (fb && item) {
            item.title = fb.get('title').value;
            
            return item;
        }
    }

    onSubmit() {
        this.submitted = true;
        if (this.generalForm.invalid) {
            return;
        }

        this.loading = true;
        let item = new JobCategory();
        item = this.setCounryObject(this.generalForm, item);
        if (this.cntrId) {
            item.id = this.cntrId;
            this.subs.push(
                this.jobCategoryService.updateJobCategory(item).pipe(
                    finalize(() => {
                        this.loading = false;
                    }),
                    catchError(err => {
                        return NEVER;
                    })
                ).subscribe(data => {
                    this.router.navigate(["/lists/job-categories"]);
                })
            );
        } else {
            this.subs.push(
                this.jobCategoryService.addJobCategory(item).pipe(
                    finalize(() => {
                        this.loading = false;
                    }),
                    catchError(err => {
                        return NEVER;
                    })
                ).subscribe(data => {
                    this.router.navigate(["/lists/job-categories"]);
                })
            );
        }
    }

    ngOnDestroy() {
        this.subs.forEach((sub) => {
            sub.unsubscribe();
        });
    }

}

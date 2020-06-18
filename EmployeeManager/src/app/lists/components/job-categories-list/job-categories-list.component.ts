import { Component, OnInit } from '@angular/core';
import { JobCategory } from '../../models/jobCategory';
import { Subscription, NEVER } from 'rxjs';
import { Country } from '../../models/country';
import { CountryService } from '../../services/country.service';
import { Router } from '@angular/router';
import { finalize, catchError, concatMap } from 'rxjs/operators';
import { JobCategoryService } from '../../services/job-category.service';

@Component({
    selector: 'app-job-categories-list',
    templateUrl: './job-categories-list.component.html',
    styleUrls: ['./job-categories-list.component.css']
})
export class JobCategoriesListComponent implements OnInit {

    jobCategories: JobCategory[];

    private subs: Subscription[] = [];
    public loading = false;
    editMode: boolean;

    constructor(
        private jobCategoryService: JobCategoryService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.loading = true;
        this.subs.push(
            this.jobCategoryService.getJobCategories().pipe(
                finalize(() => this.loading = false),
                catchError(error => {
                    return NEVER;
                })
            ).subscribe((data: JobCategory[]) => {
                this.jobCategories = data;
            })
        );
    }

    addItem(){
        this.router.navigate(['/lists/job-categories/details']);
    }

    editItem(id: string){
        this.router.navigate(['/lists/job-categories/details'], {queryParams: {id: id}});
    }

    delItem(id: string){
        this.loading = true;
        this.subs.push(
            this.jobCategoryService.deleteJobCategory(id).pipe(
                concatMap(() => this.jobCategoryService.getJobCategories()),
                finalize(() => this.loading = false),
                catchError(error => {
                    return NEVER;
                })
            ).subscribe((data: any) => {
                this.jobCategories = data;
            })
        );
    }

}

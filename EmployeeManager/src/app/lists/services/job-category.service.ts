import { Injectable } from '@angular/core';
import { ConfigService } from '../../common/services/config.service';
import { REST_URL, httpOptions } from '../../common/models/constants';
import { HttpClient } from '@angular/common/http';
import { JobCategory } from '../models/jobCategory';

@Injectable({
    providedIn: 'root'
})
export class JobCategoryService {

    constructor(private http: HttpClient) { }

    getJobCategories() {
        return this.http.get(`${ConfigService.apiUrl}${REST_URL.JOB_CATEGORIES}`);
    }

    getJobCategory(id: string) {
        return this.http.get(`${ConfigService.apiUrl}${REST_URL.JOB_CATEGORIES}/${id}`);
    }

    addJobCategory(jobCategory: JobCategory) {
        return this.http.post<JobCategory>(`${ConfigService.apiUrl}${REST_URL.JOB_CATEGORIES}`, jobCategory, httpOptions);
    }

    updateJobCategory(jobCategory: JobCategory) {
        return this.http.put<JobCategory>(`${ConfigService.apiUrl}${REST_URL.JOB_CATEGORIES}`, jobCategory, httpOptions);
    }

    deleteJobCategory(id: string) {
        return this.http.delete(`${ConfigService.apiUrl}${REST_URL.JOB_CATEGORIES}/${id}`);
    }
}

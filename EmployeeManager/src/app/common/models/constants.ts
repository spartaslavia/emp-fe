import { HttpHeaders } from '@angular/common/http';
export const ROUTES = {
    employees: 'employees',
    countries: 'countries',
    jobCategories: 'jobCategories',
}
export const REST_URL = {
    EMPLOYEES: '/employee',
    COUNTRIES: '/country',
    JOB_CATEGORIES: '/jobCategory'
}

export const httpOptions = {
    headers: new HttpHeaders({
        "content-type": "application/json;charset=utf-8",
        "cache-control": "no-cache",
    })
}
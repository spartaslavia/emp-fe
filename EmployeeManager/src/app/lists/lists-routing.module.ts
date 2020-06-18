import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobCategoriesListComponent } from './components/job-categories-list/job-categories-list.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { JobCategoryDetailsComponent } from './components/job-category-details/job-category-details.component';


const routes: Routes = [
    {
        path: 'countries',
        component: CountryListComponent
    },
    {
        path: 'job-categories',
        component: JobCategoriesListComponent
    },
    {
        path: 'countries/details',
        component: CountryDetailsComponent
    },
    {
        path: 'job-categories/details',
        component: JobCategoryDetailsComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListsRoutingModule { }
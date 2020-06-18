import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryListComponent } from './components/country-list/country-list.component';
import { JobCategoriesListComponent } from './components/job-categories-list/job-categories-list.component';
import { ListsRoutingModule } from './lists-routing.module';
import { CountryDetailsComponent } from './components/country-details/country-details.component';
import { JobCategoryDetailsComponent } from './components/job-category-details/job-category-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpCommonModule } from '../common/emp-common.module';

@NgModule({
    declarations: [
        CountryListComponent,
        JobCategoriesListComponent,
        CountryDetailsComponent,
        JobCategoryDetailsComponent,
    ],
    exports: [
        CountryListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ListsRoutingModule,
        EmpCommonModule,
    ]
})
export class ListsModule { }

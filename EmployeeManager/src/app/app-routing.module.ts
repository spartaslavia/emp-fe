import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './common/components/home/home.component';
import { NotFoundComponent } from './common/components/not-found/not-found.component';
import { EmployeeDetailsComponent } from './employee/components/employee-details/employee-details.component';
import { CountryListComponent } from './lists/components/country-list/country-list.component';


const routes: Routes = [
    { path: 'employee', component: EmployeeDetailsComponent },
    // { path: 'countries', component: CountryListComponent},
    { path: 'lists', loadChildren: () => import('./lists/lists.module').then(m => m.ListsModule) },
    { path: 'employee', component: EmployeeDetailsComponent },
    { path: '', component: HomeComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

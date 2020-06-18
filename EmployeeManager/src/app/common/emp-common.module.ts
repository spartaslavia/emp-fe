import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EmployeeModule } from '../employee/employee.module';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
    declarations: [
        NavbarComponent,
        HomeComponent,
        NotFoundComponent,
        LoaderComponent,
    ],
    exports: [
        NavbarComponent,
        LoaderComponent,
    ],
    imports: [
        CommonModule,
        EmployeeModule,
    ],
    providers: [

    ]

})
export class EmpCommonModule { }

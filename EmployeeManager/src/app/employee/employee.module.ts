import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpCommonModule } from '../common/emp-common.module';

@NgModule({
    declarations: [
        EmployeeListComponent,
        EmployeeDetailsComponent,
    ],
    exports: [
        EmployeeListComponent,
        EmployeeDetailsComponent,
    ],
    imports: [
        CommonModule,
        NgbModule,
        ReactiveFormsModule,
        // EmpCommonModule,
    ]
})
export class EmployeeModule { }

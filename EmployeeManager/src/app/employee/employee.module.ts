import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
    ]
})
export class EmployeeModule { }

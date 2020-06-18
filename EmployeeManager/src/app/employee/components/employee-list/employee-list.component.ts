import { Component, OnInit, Input } from '@angular/core';
import { Employee, Gender } from '../../models/employee';
import { Subscription, NEVER } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { catchError, finalize, map, concatMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
    private subs: Subscription[] = [];
    public loading = false;
    genders = Gender;

    @Input()
    employees: Employee[]

    constructor(
        private employeeService: EmployeeService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.getEmployees();
    }

    getEmployees(): void {
        this.loading = true;
        this.subs.push(
            this.employeeService.getEmployees().pipe(
                finalize(() => this.loading = false),
                catchError(error => {
                    return NEVER;
                })
            ).subscribe((data: Employee[]) => {
                this.employees = data;
            })
        );
    }

    addItem(){
        this.router.navigate(['/employee']);
    }

    editItem(id: string){
        this.router.navigate(['/employee'], {queryParams: {id: id}});
    }

    delItem(id: string){
        this.loading = true;
        this.subs.push(
            this.employeeService.deleteEmployee(id).pipe(
                concatMap(() => this.employeeService.getEmployees()),
                finalize(() => this.loading = false),
                catchError(error => {
                    return NEVER;
                })
            ).subscribe((data: any) => {
                this.employees = data;
            })
        );
    }

    ngOnDestroy() {
        this.subs.forEach((sub) => {
            sub.unsubscribe();
        });
    }
}

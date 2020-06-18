import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, Gender } from '../../models/employee';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, NEVER } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { catchError, finalize } from 'rxjs/operators';
import * as moment from 'moment';
import { CountryService } from '../../../lists/services/country.service';
import { Country } from '../../../lists/models/country';
import { JobCategory } from '../../../lists/models/jobCategory';
import { JobCategoryService } from '../../../lists/services/job-category.service';


@Component({
    selector: 'app-employee-details',
    templateUrl: './employee-details.component.html',
    styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
    private subs: Subscription[] = [];
    loading = false;
    submitted = false;
    generalForm: FormGroup;
    genders = Gender;
    genderKeys: string[]
    countries: Country[];
    jobCategories: JobCategory[];
    empId: string;
    @Input()
    employee: Employee;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private employeeService: EmployeeService,
        private countryService: CountryService,
        private jobCategoryService: JobCategoryService,
    ) { }

    ngOnInit() {
        this.loading = true;
        this.empId = this.route.snapshot.queryParams['id'];
        this.initForm();

        this.loading = false;
    }

    initForm() {
        this.initCountrySelect();
        this.initJobCategorySelect();
        this.genderKeys = Object.keys(this.genders).filter(k => !isNaN(Number(k)));
        this.generalForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            dateBirth: ['', Validators.required],
            gender: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            dateJoined: ['', Validators.required],
            dateExited: ['', Validators.required],
            jobCategory: ['', Validators.required],
            country: ['', Validators.required],
        });

        this.setDataToForm(this.empId);
    }

    initCountrySelect() {
        this.subs.push(
            this.countryService.getCountries().pipe(
                finalize(() => { }),
                catchError(err => {
                    return NEVER;
                })
            ).subscribe((data: any) => {
                this.countries = data;
            })
        );
    }

    initJobCategorySelect() {
        this.subs.push(
            this.jobCategoryService.getJobCategories().pipe(
                finalize(() => { }),
                catchError(err => {
                    return NEVER;
                })
            ).subscribe((data: any) => {
                this.jobCategories = data;
            })
        );
    }

    setDataToForm(id: string) {
        this.employeeService.getEmployee(id).subscribe((data: Employee) => {
            if (data) {
                this.generalForm.get('firstName').setValue(data.firstName);
                this.generalForm.get('lastName').setValue(data.lastName);
                this.generalForm.get('dateBirth').setValue(this.getDate(data.birthDate));
                this.generalForm.get('dateJoined').setValue(this.getDate(data.joinedDate));
                this.generalForm.get('dateExited').setValue(this.getDate(data.exitedDate));
                this.generalForm.get('email').setValue(data.email);
                this.generalForm.get('phone').setValue(data.phoneNumber);
                this.generalForm.get('gender').setValue(data.gender);
                this.generalForm.get('jobCategory').setValue(data.jobCategoryId);
                this.generalForm.get('country').setValue(data.countryId);
            }
        })
    }

    private getDate(date) {
        const mDate = moment(date);
        return {
            year:mDate.year(),
            month:mDate.month(), 
            day: mDate.date(),
        }
    }

    setEmployeeObject(fb: FormGroup, emp: Employee) {
        if (fb && emp) {
            emp.firstName = fb.get('firstName').value;
            emp.lastName = fb.get('lastName').value;
            emp.birthDate = moment(fb.get('dateBirth').value);
            emp.joinedDate = moment(fb.get('dateJoined').value);
            emp.exitedDate = moment(fb.get('dateExited').value);
            emp.email = fb.get('email').value;
            emp.phoneNumber = fb.get('phone').value;
            emp.gender = fb.get('gender').value;
            emp.countryId = fb.get('country').value;
            emp.jobCategoryId = fb.get('jobCategory').value;
            return emp;
        }
    }

    onSubmit() {
        this.submitted = true;
        if (this.generalForm.invalid) {
            return;
        }

        this.loading = true;
        let employee = new Employee();
        employee = this.setEmployeeObject(this.generalForm, employee);
        if (this.empId) {
            employee.id = this.empId;
            this.subs.push(
                this.employeeService.updateEmployee(employee).pipe(
                    finalize(() => {
                        this.loading = false;
                    }),
                    catchError(err => {
                        return NEVER;
                    })
                ).subscribe(data => {
                    this.router.navigate(["/"]);
                })
            );
        } else {
            this.subs.push(
                this.employeeService.addEmployee(employee).pipe(
                    finalize(() => {
                        this.loading = false;
                    }),
                    catchError(err => {
                        return NEVER;
                    })
                ).subscribe(data => {
                    this.router.navigate(["/"]);
                })
            );
        }
    }

    ngOnDestroy() {
        this.subs.forEach((sub) => {
            sub.unsubscribe();
        });
    }
}

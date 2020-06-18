import { Component, OnInit } from '@angular/core';
import { Subscription, NEVER } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { finalize, catchError, concatMap } from 'rxjs/operators';
import { Country } from '../../models/country';
import { CountryService } from '../../services/country.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-country-details',
    templateUrl: './country-details.component.html',
    styleUrls: ['./country-details.component.css']
})
export class CountryDetailsComponent implements OnInit {
    private subs: Subscription[] = [];
    loading = false;
    submitted = false;
    generalForm: FormGroup;
    cntrId: string;

    constructor(
        private fb: FormBuilder,
        private countryService: CountryService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.loading = true;
        this.cntrId = this.route.snapshot.queryParams['id'];
        this.initForm();

        this.loading = false;
    }

    initForm() {
        this.generalForm = this.fb.group({
            name: ['', Validators.required],
        });

        this.setDataToForm(this.cntrId);
    }

    setDataToForm(id: string) {
        this.countryService.getCountry(id).subscribe((data: Country) => {
            if (data) {
                this.generalForm.get('name').setValue(data.name);
            }
        })
    }

    setCounryObject(fb: FormGroup, cntr: Country) {
        if (fb && cntr) {
            cntr.name = fb.get('name').value;
            
            return cntr;
        }
    }

    onSubmit() {
        this.submitted = true;
        if (this.generalForm.invalid) {
            return;
        }

        this.loading = true;
        let country = new Country();
        country = this.setCounryObject(this.generalForm, country);
        if (this.cntrId) {
            country.id = this.cntrId;
            this.subs.push(
                this.countryService.updateCountry(country).pipe(
                    finalize(() => {
                        this.loading = false;
                    }),
                    catchError(err => {
                        return NEVER;
                    })
                ).subscribe(data => {
                    this.router.navigate(["/lists/countries"]);
                })
            );
        } else {
            this.subs.push(
                this.countryService.addCountry(country).pipe(
                    finalize(() => {
                        this.loading = false;
                    }),
                    catchError(err => {
                        return NEVER;
                    })
                ).subscribe(data => {
                    this.router.navigate(["/lists/countries"]);
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

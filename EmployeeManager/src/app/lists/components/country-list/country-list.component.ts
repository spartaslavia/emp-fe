import { Component, OnInit } from '@angular/core';
import { Country } from '../../models/country';
import { CountryService } from '../../services/country.service';
import { Subscription, NEVER } from 'rxjs';
import { finalize, catchError, concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-country-list',
    templateUrl: './country-list.component.html',
    styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

    private subs: Subscription[] = [];
    public loading = false;
    countries: Country[];
    editMode: boolean;

    constructor(
        private countryService: CountryService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.loading = true;
        this.subs.push(
            this.countryService.getCountries().pipe(
                finalize(() => this.loading = false),
                catchError(error => {
                    return NEVER;
                })
            ).subscribe((data: Country[]) => {
                this.countries = data;
            })
        );
        
    }

    addItem(){
        this.router.navigate(['/lists/countries/details']);
    }

    editItem(id: string){
        this.router.navigate(['/lists/countries/details'], {queryParams: {id: id}});
    }

    delItem(id: string){
        this.loading = true;
        this.subs.push(
            this.countryService.deleteCountry(id).pipe(
                concatMap(() => this.countryService.getCountries()),
                finalize(() => this.loading = false),
                catchError(error => {
                    return NEVER;
                })
            ).subscribe((data: any) => {
                this.countries = data;
            })
        );
    }

    ngOnDestroy() {
        this.subs.forEach((sub) => {
            sub.unsubscribe();
        });
    }

}

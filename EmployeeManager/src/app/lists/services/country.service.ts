import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../common/services/config.service';
import { REST_URL, httpOptions } from '../../common/models/constants';
import { Country } from '../models/country';

@Injectable({
    providedIn: 'root'
})
export class CountryService {

    constructor(private http: HttpClient) { }

    getCountries() {
        return this.http.get(`${ConfigService.apiUrl}${REST_URL.COUNTRIES}`);
    }

    getCountry(id: string) {
        return this.http.get(`${ConfigService.apiUrl}${REST_URL.COUNTRIES}/${id}`);
    }

    addCountry(country: Country) {
        return this.http.post<Country>(`${ConfigService.apiUrl}${REST_URL.COUNTRIES}`, country, httpOptions);
    }

    updateCountry(country: Country) {
        return this.http.put<Country>(`${ConfigService.apiUrl}${REST_URL.COUNTRIES}`, country, httpOptions);
    }

    deleteCountry(id: string) {
        return this.http.delete(`${ConfigService.apiUrl}${REST_URL.COUNTRIES}/${id}`);
    }
}

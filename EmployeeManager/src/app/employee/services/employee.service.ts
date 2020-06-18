import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, mapTo } from 'rxjs/operators';
import { ConfigService } from '../../common/services/config.service';
import { REST_URL, httpOptions } from '../../common/models/constants';
import { Employee } from '../models/employee';
import { NEVER } from 'rxjs';

// const httpOptions = {
//     headers: new HttpHeaders({
//         "content-type": "application/json;charset=utf-8",
//         "cache-control": "no-cache",
//         "Accept": "*/*",
//     })
// };

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(
        private http: HttpClient,
    ) { }

    getEmployees(){
        return this.http.get(`${ConfigService.apiUrl}${REST_URL.EMPLOYEES}`);
    }

    getEmployee(id: string){
        return this.http.get(`${ConfigService.apiUrl}${REST_URL.EMPLOYEES}/${id}`);
    }

    addEmployee(employee: Employee) {
        return this.http.post<Employee>(`${ConfigService.apiUrl}${REST_URL.EMPLOYEES}`, employee, httpOptions);
    }

    updateEmployee(employee: Employee) {
        return this.http.put<Employee>(`${ConfigService.apiUrl}${REST_URL.EMPLOYEES}`, employee, httpOptions);
    }

    deleteEmployee(id: string) {
        return this.http.delete(`${ConfigService.apiUrl}${REST_URL.EMPLOYEES}/${id}`);
    }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeModule } from './employee/employee.module';
import { EmpCommonModule } from './common/emp-common.module';
import { ListsModule } from './lists/lists.module';
import { LoaderComponent } from './common/components/loader/loader.component';


@NgModule({
    declarations: [
        AppComponent,
    ],
    exports: [
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        EmployeeModule,
        EmpCommonModule,
        ListsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

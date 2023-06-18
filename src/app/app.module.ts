import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPrimeModule } from './ngprime.module';
import { AuthComponent } from './auth/auth.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ProjectComponent } from './project/project.component';
import { HeaderComponent } from './header/header.component';
import { BaseComponent } from './base/base.component';
import { MapComponent } from './map/map.component';
import { ProductComponent } from './product/product.component';
import { FactorInfoDialogComponent } from './factor-info-dialog/factor-info-dialog.component';
import { ProfileComponent } from './profile/profile.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { DialogService } from 'primeng/dynamicdialog';
import { EditDeleteChooserComponent } from './edit-delete-chooser/edit-delete-chooser.component';
import { WeatherReportChartComponent } from './weather-report-chart/weather-report-chart.component';

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        DashboardComponent,
        ProjectComponent,
        HeaderComponent,
        BaseComponent,
        MapComponent,
        ProductComponent,
        FactorInfoDialogComponent,
        ProfileComponent,
        AddEditProductComponent,
        EditDeleteChooserComponent,
        WeatherReportChartComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgPrimeModule,
    ],
    providers: [
        MessageService,
        DialogService,
        ConfirmationService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

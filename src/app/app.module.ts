import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPrimeModule } from './ngprime.module';
import { AuthComponent } from './auth/auth.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ToastService } from './services/toast.service';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
        DashboardComponent,
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
        UserService,
        ToastService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

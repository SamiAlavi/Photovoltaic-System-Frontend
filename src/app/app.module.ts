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

@NgModule({
    declarations: [
        AppComponent,
        AuthComponent,
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
        UserService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

import AppSettings from '../AppSettings';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserCredentials } from '../helpers/interfaces';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {

    }

    signup(userCredentials: IUserCredentials): Observable<Object> {
        return this.http.post(AppSettings.SignupUrl, userCredentials);
    }

    signin(userCredentials: IUserCredentials): Observable<Object> {
        return this.http.post(AppSettings.SigninUrl, userCredentials);
    }

    signout(): Observable<Object> {
        return this.http.get(AppSettings.SignoutUrl);
    }

}

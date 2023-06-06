import AppSettings from '../AppSettings';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { IUserCredentials } from '../helpers/interfaces';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private sessionService: SessionService) {
    }

    signup(userCredentials: IUserCredentials): Observable<any> {
        return this.http.post(AppSettings.SignupUrl, userCredentials);
    }

    signin(userCredentials: IUserCredentials): Observable<any> {
        return this.http.post(AppSettings.SigninUrl, userCredentials).pipe(map((response) => {
            this.sessionService.saveSession(response);
            return of();
        }));
    }

    signout(): Observable<any> {
        return this.http.delete(AppSettings.SignoutUrl).pipe(map(() => {
            this.sessionService.clearSession();
            return of();
        }));
    }

    isAuthenticated(): boolean {
        return this.sessionService.isAuthenticated();
    }

}

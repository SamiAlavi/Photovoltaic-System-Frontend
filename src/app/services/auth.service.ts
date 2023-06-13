import AppSettings from '../AppSettings';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { ICustomUserRecord, IUserCredentials } from '../helpers/interfaces';
import { SessionService } from './session.service';
import { ProjectService } from './project.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private sessionService: SessionService,
        private projectService: ProjectService,
    ) {
    }

    signup(userCredentials: IUserCredentials): Observable<any> {
        return this.http.post<ICustomUserRecord>(AppSettings.SignupUrl, userCredentials);
    }

    signin(userCredentials: IUserCredentials): Observable<void> {
        return this.http.post<ICustomUserRecord>(AppSettings.SigninUrl, userCredentials).pipe(map((response) => {
            this.sessionService.saveSession(response);
            return;
        }));
    }

    signout(): Observable<void> {
        return this.http.delete(AppSettings.SignoutUrl).pipe(map(() => {
            this.sessionService.clearSession();
            this.projectService.clearProjects();
            return;
        }));
    }

    isAuthenticated(): boolean {
        return this.sessionService.isAuthenticated();
    }

}

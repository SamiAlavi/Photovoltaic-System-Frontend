import AppSettings from '../AppSettings';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserCredentials } from '../helpers/interfaces';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {

    }

    authenticate(userCredentials: IUserCredentials): Observable<Object> {
        return this.http.post(AppSettings.loginUrl, userCredentials);
    }

}

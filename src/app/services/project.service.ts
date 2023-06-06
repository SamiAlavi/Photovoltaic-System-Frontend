import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import AppSettings from '../AppSettings';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private http: HttpClient) {

    }

    getProjects(): Observable<any[]> {
        return this.http.get<any[]>(AppSettings.ProjectUrl);
    }
}

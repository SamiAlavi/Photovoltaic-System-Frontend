import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import AppSettings from '../AppSettings';
import { IProject } from '../helpers/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private http: HttpClient) {

    }

    getProjects(): Observable<IProject[]> {
        return this.http.get<IProject[]>(AppSettings.ProjectUrl);
    }
}

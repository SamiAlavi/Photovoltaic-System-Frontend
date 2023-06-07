import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import AppSettings from '../AppSettings';
import { IProject } from '../helpers/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    projects: string[] = [];
    currentProject: IProject | null = null;

    constructor(private http: HttpClient) {

    }

    getProjects(): Observable<string[]> {
        if (this.projects.length) {
            return of(this.projects);
        }
        return this.http.get<string[]>(AppSettings.ProjectUrl);
    }

    getProject(projectId: string): Observable<IProject> {
        const projectUrl = `${AppSettings.ProjectUrl}/${projectId}`;
        return this.http.get<IProject>(projectUrl);
    }

    clearProjects() {
        this.projects = [];
        this.currentProject = null;
    }
}

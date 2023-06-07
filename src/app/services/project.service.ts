import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import AppSettings from '../AppSettings';
import { IProject } from '../helpers/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    projects: IProject[] = [];
    projectsIds: string[] = [];
    currentProject: IProject | null = null;

    constructor(private http: HttpClient) {

    }

    getProjects(): Observable<IProject[]> {
        if (this.projects.length) {
            return of(this.projects);
        }
        return this.http.get<IProject[]>(AppSettings.ProjectUrl);
    }

    createProject(projectId: string): Observable<IProject> {
        const project = { id: projectId };
        return this.http.post<IProject>(AppSettings.ProjectUrl, project);
    }

    clearProjects() {
        this.projects = [];
        this.currentProject = null;
    }
}

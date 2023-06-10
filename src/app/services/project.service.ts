import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import AppSettings from '../AppSettings';
import { IProductDetail, IProject } from '../helpers/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    projects: IProject[] = [];
    projectsIds: string[] = [];
    currentProject: IProject | null = null;
    private readonly PROJECT_KEY = AppSettings.PROJECT_KEY;

    constructor(private http: HttpClient) {
        const cacheProject = localStorage.getItem(this.PROJECT_KEY);
        if (cacheProject) {
            this.currentProject = JSON.parse(cacheProject);
        }
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
        localStorage.removeItem(this.PROJECT_KEY);
    }

    cacheProject(selectedProject: IProject) {
        this.currentProject = selectedProject;
        localStorage.setItem(this.PROJECT_KEY, JSON.stringify(this.currentProject));
    }

    addProduct(product: IProductDetail) {
        if (!this.currentProject) {
            return of(false);
        }
        this.currentProject.products.push(product);
        return this.http.post<IProject>(AppSettings.AddProductUrl, this.currentProject).pipe(map((response) => {
            this.cacheProject(response);
            return true;
        }));
    }
}

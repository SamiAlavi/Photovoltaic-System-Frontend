import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import AppSettings from '../AppSettings';
import { IAddProductRequest, IDeleteProjectRequest, IProductDetail, IProject } from '../helpers/interfaces';

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
        const body = { projectId: projectId };
        return this.http.post<IProject>(AppSettings.ProjectUrl, body);
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

    clearCache() {
        this.currentProject = null;
        localStorage.removeItem(this.PROJECT_KEY);
    }

    addProduct(product: IProductDetail): Observable<boolean> {
        if (!this.currentProject) {
            return of(false);
        }
        const body: IAddProductRequest = {
            projectId: this.currentProject.id,
            product: product,
        };
        return this.http.post<IProject>(AppSettings.AddProductUrl, body).pipe(map((response) => {
            this.currentProject.products.push(product);
            this.cacheProject(this.currentProject);
            return true;
        }));
    }

    deleteProject(project: IProject): Observable<boolean> {
        if (!this.currentProject) {
            return of(false);
        }
        const body: IDeleteProjectRequest = {
            projectId: project.id,
        };
        return this.http.delete<boolean>(AppSettings.ProjectUrl, { body: body }).pipe(map((response) => {
            this.clearCache();
            return response;
        }));

    }
}

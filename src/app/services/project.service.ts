import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import AppSettings from '../AppSettings';
import { IAddProductRequest, IDeleteProjectRequest, IProductDetail, IProject, IReportData } from '../helpers/interfaces';

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
        const body = { projectId: projectId };
        return this.http.post<IProject>(AppSettings.ProjectUrl, body);
    }

    clearProjects() {
        this.projects = [];
        this.currentProject = null;
    }

    cacheProject(selectedProject: IProject) {
        this.currentProject = selectedProject;
    }

    clearCache() {
        this.currentProject = null;
    }

    addProduct(product: IProductDetail): Observable<boolean> {
        if (!this.currentProject) {
            return of(false);
        }
        const body: IAddProductRequest = {
            projectId: this.currentProject.id,
            product: product,
        };
        return this.http.post<void>(AppSettings.AddProductUrl, body).pipe(map((_) => {
            this.currentProject.products.push(product);
            this.cacheProject(this.currentProject);
            return true;
        }));
    }

    editProduct(product: IProductDetail): Observable<boolean> {
        if (!this.currentProject) {
            return of(false);
        }
        const body: IAddProductRequest = {
            projectId: this.currentProject.id,
            product: product,
        };
        return this.http.put<void>(AppSettings.AddProductUrl, body).pipe(map((_) => {
            this.updateLocalProduct(product);
            return true;
        }));
    }

    private updateLocalProduct(product: IProductDetail) {
        const prodIndex = this.currentProject.products.findIndex((prod) => prod.id === product.id);
        if (prodIndex > -1) {
            this.currentProject.products[prodIndex] = product;
        }
        this.cacheProject(this.currentProject);
    }

    deleteProduct(product: IProductDetail): Observable<boolean> {
        if (!this.currentProject) {
            return of(false);
        }
        const body: IAddProductRequest = {
            projectId: this.currentProject.id,
            product: product,
        };
        return this.http.delete<void>(AppSettings.AddProductUrl, { body: body }).pipe(map((_) => {
            this.currentProject.products = this.currentProject.products.filter((prod) => prod.id !== product.id);
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

    generateProductReport(product: IProductDetail): Observable<any> {
        if (!this.currentProject) {
            return of(false);
        }
        const body: IAddProductRequest = {
            projectId: this.currentProject.id,
            product: product,
        };
        return this.http.post<any>(AppSettings.ProductReportUrl, body).pipe(map((weatherData: IReportData) => {
            if (weatherData) {
                product.isActive = false;
                product.report = weatherData;
                this.updateLocalProduct(product);
            }
            return weatherData;
        }));
    }
}

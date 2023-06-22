import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import AppSettings from '../AppSettings';
import { IAddProductRequest, IDeleteProjectRequest, IProductDetail, IProject, IReportJSON, ISuccessResponse } from '../helpers/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    projects: IProject[] = [];
    projectsIds: string[] = [];
    currentProject: IProject | null = null;

    constructor(private http: HttpClient) {
    }

    // projects

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

    clearProjects() {
        this.projects = [];
        this.currentProject = null;
    }

    cacheProject(selectedProject: IProject) {
        this.currentProject = selectedProject;
    }

    private clearCache() {
        this.currentProject = null;
    }

    // product

    addProduct(product: IProductDetail): Observable<boolean> {
        if (!this.currentProject) {
            return of(false);
        }
        const body: IAddProductRequest = {
            projectId: this.currentProject.id,
            product: product,
        };
        return this.http.post<ISuccessResponse>(AppSettings.AddProductUrl, body).pipe(map((response) => {
            this.currentProject.products.push(product);
            this.cacheProject(this.currentProject);
            return !!response;
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
        return this.http.put<ISuccessResponse>(AppSettings.AddProductUrl, body).pipe(map((response) => {
            this.updateLocalProduct(product);
            return !!response;
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
        return this.http.delete<ISuccessResponse>(AppSettings.AddProductUrl, { body: body }).pipe(map((response) => {
            this.currentProject.products = this.currentProject.products.filter((prod) => prod.id !== product.id);
            this.cacheProject(this.currentProject);
            return !!response;
        }));
    }

    generateProductReport(product: IProductDetail): Observable<IReportJSON> {
        if (!this.currentProject) {
            const tempData = { datetimes: [], electrictyProduced: [] };
            const weatherData: IReportJSON = { hourly: tempData, daily: tempData };
            return of(weatherData);
        }
        const body: IAddProductRequest = {
            projectId: this.currentProject.id,
            product: product,
        };
        return this.http.post<IReportJSON>(AppSettings.ProductReportUrl, body).pipe(map((weatherData) => {
            if (weatherData) {
                product.isActive = false;
                product.report = weatherData;
                this.updateLocalProduct(product);
            }
            return weatherData;
        }));
    }
}

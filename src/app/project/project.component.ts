import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { IProductDetail, IProject } from '../helpers/interfaces';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import AppSettings from '../AppSettings';
import { Helpers } from '../helpers/Helpers';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
})
export class ProjectComponent {
    @ViewChild('createProjectDiv') createProjectDiv!: ElementRef;
    @ViewChild('chooseProjectDiv') chooseProjectDiv!: ElementRef;

    projectId = "";
    selectedProject!: IProject;
    selectedProjectId!: string;
    isBreakpointReached = false;
    projects: IProject[] = [];
    projectsIds: string[] = [];
    groupedProjects: { label: string, items: IProject[]; }[] = [];

    constructor(
        private projectService: ProjectService,
        private toastService: ToastService,
        private router: Router,
        private confirmationService: ConfirmationService,
    ) {
        this.onResize();
        this.getProjects();
    }
    private getProjects() {
        this.projectService.getProjects().subscribe((projects) => {
            if (projects.length) {
                this.setupProjects(projects);
            }
        });
    }

    private setupProjects(projects: IProject[]) {
        this.projects = projects;
        this.projectsIds = projects.map((project) => project.id);
        this.groupedProjects = [true, false].map((isActive) => ({
            label: isActive ? 'Active' : 'Inactive',
            items: projects.filter(proj => proj.isActive === isActive),
        }));
        this.selectedProject = projects[0];
    }

    createProject() {
        if (!this.projectId) {
            return;
        }

        if (this.projectsIds.includes(this.projectId)) {
            this.toastService.showErrorToast("The project name you entered already exists. Please choose a different name for your project.");
            return;
        }

        this.projectService.createProject(this.projectId).subscribe((project) => {
            this.toastService.showSuccessToast("Project Created Successfully");
            this.projects.push(project);
            this.selectedProject = project;
            this.openProject();
        });
    }

    openProject() {
        this.projectService.cacheProject(this.selectedProject);
        this.router.navigateByUrl(AppSettings.RouteDashboard);
    }

    deleteProject() {
        this.confirmationService.confirm({
            message: `Are you sure that you want to delete the project (${this.selectedProject.id})?`,
            header: 'Delete Profile',
            icon: 'pi pi-exclamation-triangle text-red-700',
            accept: () => {
                this.projectService.deleteProject(this.selectedProject).subscribe((isDeleted) => {
                    if (isDeleted) {
                        this.projects = this.projects.filter((proj) => proj !== this.selectedProject);
                        this.setupProjects(this.projects);
                    }
                });
            },
            reject: (type) => {
            }
        });
    }

    getHtml(product: IProductDetail): string {
        const color = "rgba(255, 255, 255, 0.87)";
        return Helpers.getHTMLFromProduct(product, color);
    }

    @HostListener('window:resize')
    onResize() {
        const windowWidth = window.innerWidth;
        const breakpoint = 1240; // Adjust this value according to your breakpoint

        this.isBreakpointReached = windowWidth <= breakpoint;
    }
}

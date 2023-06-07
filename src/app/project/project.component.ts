import { Component } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { IProject } from '../helpers/interfaces';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import AppSettings from '../AppSettings';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
    projectId = "";
    selectedProject!: IProject;
    selectedProjectId!: string;

    constructor(
        private projectService: ProjectService,
        private toastService: ToastService,
        private router: Router,
    ) {
        this.getProjects();
    }

    get projectsIds(): string[] {
        return this.projectService.projectsIds;
    }
    set projectsIds(projsIds: string[]) {
        this.projectService.projectsIds = projsIds;
    }

    get projects(): IProject[] {
        return this.projectService.projects;
    }
    set projects(projs: IProject[]) {
        this.projectService.projects = projs;
    }

    private getProjects() {
        this.projectService.getProjects().subscribe((projects) => {
            if (projects.length) {
                this.projects = projects;
                this.projectsIds = projects.map((project) => project.id);
                this.selectedProject = projects[0];
            }
        });
    }

    private getProjectsIds() {
        this.projectService.getProjectsIds().subscribe((projectsIds) => {
            if (projectsIds.length) {
                this.projectsIds = projectsIds;
                this.selectedProjectId = projectsIds[0];
            }
        });
    }

    getProject() {
        if (!this.selectedProject) {
            return;
        }

        this.projectService.getProject(this.selectedProjectId).subscribe((project) => {
            this.openProject(project);
        });
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
            this.openProject(project);
        });
    }

    private openProject(project: IProject) {
        this.projectService.currentProject = project;
        console.log(project);
        this.router.navigateByUrl(AppSettings.RouteDashboard);
    }
}

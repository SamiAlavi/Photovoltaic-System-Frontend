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
    projects: IProject[] = [];
    projectsIds: string[] = [];
    groupedProjects: { label: string, items: IProject[]; }[] = [];

    constructor(
        private projectService: ProjectService,
        private toastService: ToastService,
        private router: Router,
    ) {
        if (this.projectService.currentProject) {
            this.selectedProject = this.projectService.currentProject;
        }
        this.getProjects();
    }
    private getProjects() {
        this.projectService.getProjects().subscribe((projects) => {
            if (projects.length) {
                this.projects = projects;
                this.groupedProjects = [true, false].map((isActive) => ({
                    label: isActive ? 'Active' : 'Inactive',
                    items: projects.filter(proj => proj.isActive === isActive),
                }));
                this.projectsIds = projects.map((project) => project.id);
                if (!this.selectedProject) {
                    this.selectedProject = projects[0];
                }
            }
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
            this.selectedProject = project;
            this.openProject();
        });
    }

    openProject() {
        this.projectService.cacheProject(this.selectedProject);
        this.router.navigateByUrl(AppSettings.RouteDashboard);
    }
}

import { Component } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { IProject } from '../helpers/interfaces';
import { ToastService } from '../services/toast.service';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
    projectName = "";
    selectedProject: string | null = null;

    constructor(
        private projectService: ProjectService,
        private toastService: ToastService,
    ) {
        this.getProjects();
    }

    get projects(): string[] {
        return this.projectService.projects;
    }


    private getProjects() {
        this.projectService.getProjects().subscribe((projects) => {
            if (projects.length) {
                this.projectService.projects = projects;
                this.selectedProject = projects[0];
            }
        });
    }

    openProject() {
        if (!this.selectedProject) {
            return;
        }

        this.projectService.getProject(this.selectedProject).subscribe((project) => {
            this.projectService.currentProject = project;
            console.log(project);
        });
    }

    createProject() {
        if (!this.projectName) {
            return;
        }

        if (this.projects.includes(this.projectName)) {
            this.toastService.showErrorToast("The project name you entered already exists. Please choose a different name for your project.");
            return;
        }

        this.toastService.showSuccessToast("Project Created Successfully");
    }
}

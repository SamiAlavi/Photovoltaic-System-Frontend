import { Component } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { IProject } from '../helpers/interfaces';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
    projectName = "";
    selectedProject: IProject | null = null;

    constructor(private projectService: ProjectService) {
        this.getProjects();
    }

    get projects(): IProject[] {
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
}

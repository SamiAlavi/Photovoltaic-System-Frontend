import { Component } from '@angular/core';
import { ProjectService } from '../services/project.service';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
    projectName = "";
    projects: any[] = [];

    constructor(private projectService: ProjectService) {
        this.getProjects();
    }

    private getProjects() {
        this.projectService.getProjects().subscribe((projects: any[]) => {
            this.projects = projects;
        });
    }
}

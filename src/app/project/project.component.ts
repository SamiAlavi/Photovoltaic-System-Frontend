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
    selectedProject!: IProject;
    projects: IProject[] = [];

    constructor(private projectService: ProjectService) {
        this.getProjects();
    }

    private getProjects() {
        // for (let i = 0; i < 10; i++) {
        //     this.projects.push({ id: i, name: `test_${i}` });
        // }
        // this.selectedProject = this.projects[0];
        this.projectService.getProjects().subscribe((projects) => {
            if (projects.length) {
                this.projects = projects;
                this.selectedProject = projects[0];
            }
        });
    }
}

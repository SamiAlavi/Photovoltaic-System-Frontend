import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import AppSettings from '../AppSettings';
import { ProjectService } from '../services/project.service';
import { HelpInfoComponent } from '../help-info/help-info.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() currentRoute: string = "";
    items: MenuItem[] = [];

    constructor(
        private authService: AuthService,
        private router: Router,
        private projectService: ProjectService,
        private dialogService: DialogService,
    ) {

    }

    ngOnInit() {
        this.items = [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                disabled: this.isDisabled(AppSettings.RouteDashboard),
                command: this.onClick.bind(null, AppSettings.RouteDashboard),
            },
            {
                label: 'Projects',
                icon: 'pi pi-fw pi-file',
                disabled: this.isDisabled(AppSettings.RouteProject),
                command: this.onClick.bind(null, AppSettings.RouteProject),
            },
        ];
        //this.viewHelpDialog();
    }

    private isDisabled(route: string) {
        return this.currentRoute === route;
    }

    private onClick = (route: string, _: any) => {
        this.router.navigateByUrl(route);
    };

    get currentProjectId(): string {
        return this.projectService.currentProject?.id ?? '';
    }

    get currentProjectStatus(): string {
        return this.projectService.currentProject?.isActive ? 'Active' : 'Inactive';
    }

    signout() {
        this.authService.signout().subscribe((_) => {
            this.router.navigateByUrl(AppSettings.RouteSignin, { skipLocationChange: true }).then(() => {
                location.reload();
            });
        });
    }

    profilePage() {
        this.router.navigateByUrl(AppSettings.RouteProfile);
    }

    viewHelpDialog() {
        this.dialogService.open(HelpInfoComponent, {
            header: `Help`,
            width: '70%',
            dismissableMask: true,
            contentStyle: { overflow: 'auto' },
        });
    }
}

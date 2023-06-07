import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import AppSettings from '../AppSettings';
import { Helpers } from '../helpers/Helpers';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    items: MenuItem[] = [];
    constructor(
        private authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
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
    }

    private isDisabled(route: string) {
        const currentUrl = Helpers.getActivateRoute(this.activatedRoute);
        return currentUrl === route;
    }

    private onClick = (route: string, _: any) => {
        this.router.navigateByUrl(route);
    };

    signout() {
        this.authService.signout().subscribe((_) => {
            this.router.navigateByUrl(AppSettings.RouteSignin);
        });
    }
}

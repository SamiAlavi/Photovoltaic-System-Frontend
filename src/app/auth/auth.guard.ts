import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { SessionService } from '../services/session.service';
import AppSettings from '../AppSettings';
import { Helpers } from '../helpers/Helpers';
import { ProjectService } from '../services/project.service';
import { ToastService } from '../services/toast.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private sessionService: SessionService,
        private router: Router,
        private projectService: ProjectService,
        private toastService: ToastService,
    ) {
    }

    canActivate(activatedRoute: ActivatedRouteSnapshot): boolean {
        if (!this.sessionService.isAuthenticated()) {
            this.router.navigateByUrl(AppSettings.RouteSignin);
            return false;
        }
        const route = Helpers.getActivatedRoute(activatedRoute);
        if (!(route === AppSettings.RouteDashboard)) {
            return true;
        }

        if (this.projectService.currentProject) {
            return true;
        }
        else {
            this.toastService.showWarnToast("Please choose a project");
            this.router.navigateByUrl(AppSettings.RouteProject);
            return false;
        }
    }
}

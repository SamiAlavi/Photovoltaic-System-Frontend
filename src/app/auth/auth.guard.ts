import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { SessionService } from '../services/session.service';
import AppSettings from '../AppSettings';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private sessionService: SessionService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {

        if (this.sessionService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigateByUrl(AppSettings.RouteSignin);
            return false;
        }
    }
}

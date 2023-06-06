import { Injectable } from '@angular/core'; // imports the class that provides local storage for token
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import AppSettings from '../AppSettings';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor {
    private readonly SESSION_KEY = AppSettings.SESSION_KEY;

    constructor(
        private toastService: ToastService,
        private sessionService: SessionService,
        private router: Router,
    ) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = localStorage.getItem(this.SESSION_KEY) ?? "{}";
        const { accessToken, uid } = JSON.parse(token);

        if (!(accessToken && uid)) {
            return next.handle(req);
        }

        req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${accessToken}`) });
        req = req.clone({ headers: req.headers.set('X-UID', uid) });
        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    // Catching Error Stage
                    if (error && error.status === 401) {
                        console.log("ERROR 401 UNAUTHORIZED"); // in case of an error response the error message is displayed
                    }
                    const err = error.error.message || error.statusText;
                    this.toastService.showErrorToast(err);

                    if (err === "Invalid token") {
                        this.sessionService.clearSession();
                        this.router.navigateByUrl(AppSettings.RouteSignin);
                    }
                    return throwError(error); // any further errors are returned to frontend                    
                })
            );
    }
}

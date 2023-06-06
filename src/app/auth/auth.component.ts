import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IUserCredentials } from '../helpers/interfaces';
import { Observable } from 'rxjs';
import AppSettings from '../AppSettings';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { SessionService } from '../services/session.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
    authForm: FormGroup;
    formType: string;
    route: string;
    private submitFn: (userCredentials: IUserCredentials) => Observable<Object>;
    private nextFn: (response: Object) => void;

    constructor(
        private formBuilder: FormBuilder,
        private toastService: ToastService,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private sessionService: SessionService,
    ) {
        this.authForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.route = this.activatedRoute.snapshot.url.join('/');
        if (this.route === "signin") {
            this.submitFn = this.authService.signin.bind(authService);
            this.nextFn = (response: any) => {
                console.log(response);
                this.toastService.showSuccessToast("Signed In Successfully");
                this.sessionService.saveSession(response);
                this.navigateByUrl(AppSettings.RouteProject, 1000);

            };
            this.formType = "In";
        }
        else {
            this.submitFn = this.authService.signup.bind(authService);
            this.nextFn = async (response) => {
                console.log(response);
                this.toastService.showSuccessToast("Signed Up Successfully");
                this.navigateByUrl(AppSettings.RouteSignin, 1000);
            };
            this.formType = "Up";
        }
    }

    ngOnInit() {
        if (this.sessionService.isAuthenticated()) {
            this.navigateByUrl(AppSettings.RouteProject);
        }
    }


    submitForm() {
        if (this.authForm.valid) {
            const userCredentials: IUserCredentials = this.authForm.value;
            this.submitFn(userCredentials).subscribe({
                next: this.nextFn,
                error: (error: HttpErrorResponse) => {
                    this.toastService.showErrorToast(error.error.message);
                }
            });
        }
        else {
            this.generateErrorMessages();
        }
    }

    private generateErrorMessages() {
        Object.entries(this.authForm.controls).forEach(([controlName, value]) => {
            if (value.status === "INVALID") {
                value.markAsDirty();
                this.toastService.showErrorToast(`${controlName}: ${value.status.toLowerCase()}`);
            }
        });
    }

    navigateByUrl(route: string, timeout = 0) {
        setTimeout(async () => {
            await this.router.navigateByUrl(route);
        }, timeout);
    }
}

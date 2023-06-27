import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IUserCredentials } from '../helpers/interfaces';
import { Observable } from 'rxjs';
import AppSettings from '../AppSettings';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../services/toast.service';
import { Helpers } from '../helpers/Helpers';
import { Messages } from '../helpers/Messages';

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
    ) {
        this.authForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.route = Helpers.getActivatedRoute(this.activatedRoute);
        if (this.route === AppSettings.RouteSignin) {
            this.submitFn = this.authService.signin.bind(authService);
            this.nextFn = () => {
                this.toastService.showSuccessToast(Messages.SigninSuccess);
                this.navigateByUrl(AppSettings.RouteProject, 1000);

            };
            this.formType = "In";
        }
        else {
            this.submitFn = this.authService.signup.bind(authService);
            this.nextFn = () => {
                this.toastService.showSuccessToast(Messages.SignupSuccess);
                this.navigateByUrl(AppSettings.RouteSignin, 1000);
            };
            this.formType = "Up";
        }
    }

    ngOnInit() {
        if (this.authService.isAuthenticated()) {
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

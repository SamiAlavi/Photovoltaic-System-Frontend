import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TOAST_SEVERITY } from '../helpers/enums';
import { UserService } from '../services/user.service';
import { IUserCredentials } from '../helpers/interfaces';
import { Observable } from 'rxjs';
import AppSettings from '../AppSettings';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../services/toast.service';

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
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.authForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.route = this.activatedRoute.snapshot.url.join('/');
        if (this.route === "signin") {
            this.submitFn = this.userService.signin.bind(userService);
            this.nextFn = (response) => {
                console.log(response);
                this.toastService.showSuccessToast("Signed In Successfully");
                this.navigateByUrl(AppSettings.RouteDashboard);

            };
            this.formType = "In";
        }
        else {
            this.submitFn = this.userService.signup.bind(userService);
            this.nextFn = async (response) => {
                console.log(response);
                this.toastService.showSuccessToast("Signed Up Successfully");
                this.navigateByUrl(AppSettings.RouteSignin);
            };
            this.formType = "Up";
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

    navigateByUrl(route: string) {
        setTimeout(async () => {
            await this.router.navigateByUrl(route);
        }, 1000);
    }
}

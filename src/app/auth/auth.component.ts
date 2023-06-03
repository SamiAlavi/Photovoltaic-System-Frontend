import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TOAST_SEVERITY } from '../helpers/enums';
import { UserService } from '../services/user.service';
import { IUserCredentials } from '../helpers/interfaces';
import { Observable } from 'rxjs';
import AppSettings from '../AppSettings';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    providers: [MessageService],
})
export class AuthComponent {
    authForm: FormGroup;
    formType: string;
    private submitFn: (userCredentials: IUserCredentials) => Observable<Object>;
    private callbackFn: (response: Object) => void;

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.authForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        const routeString = this.route.snapshot.url.join('/');
        if (routeString === "signin") {
            this.submitFn = this.userService.signin.bind(userService);
            this.callbackFn = (response) => {
                console.log(response);
            };
            this.formType = "In";
        }
        else {
            this.submitFn = this.userService.signup.bind(userService);
            this.callbackFn = async (response) => {
                console.log(response);
                await this.router.navigateByUrl(AppSettings.RouteSignin);
            };
            this.formType = "Up";
        }
    }

    submitForm() {
        if (this.authForm.valid) {
            const userCredentials: IUserCredentials = this.authForm.value;
            this.submitFn(userCredentials).subscribe(this.callbackFn);
        }
        else {
            this.generateErrorMessages();
        }
    }

    private generateErrorMessages() {
        Object.entries(this.authForm.controls).forEach(([controlName, value]) => {
            if (value.status === "INVALID") {
                value.markAsDirty();
                this.messageService.add({
                    severity: TOAST_SEVERITY.ERROR,
                    summary: 'Error',
                    detail: `${controlName}: ${value.status.toLowerCase()}`
                });
            }
        });
    }
}

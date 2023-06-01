import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TOAST_SEVERITY } from '../helpers/enums';
import { UserService } from '../services/user.service';
import { IUserCredentials } from '../helpers/interfaces';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService],
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private userService: UserService,
    ) {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    submitForm() {
        if (this.loginForm.valid) {
            const userCredentials: IUserCredentials = this.loginForm.value;
            this.userService.authenticate(userCredentials).subscribe((res) => {
                console.log(res);
            });
        }
        else {
            this.generateErrorMessages();
        }
    }

    private generateErrorMessages() {
        Object.entries(this.loginForm.controls).forEach(([controlName, value]) => {
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

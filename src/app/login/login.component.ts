import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TOAST_SEVERITY } from '../helpers/enums';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [MessageService],
})
export class LoginComponent {
    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private messageService: MessageService) {
        this.loginForm = this.formBuilder.group({
            Email: ['', [Validators.required, Validators.email]],
            Password: ['', [Validators.required]]
        });
    }

    submitForm() {
        if (this.loginForm.valid) {
            console.log(this.loginForm.value);
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
                    detail: `${controlName}: ${value.status}`
                });
            }
        });
    }
}

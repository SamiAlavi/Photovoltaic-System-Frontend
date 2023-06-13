import { Component } from '@angular/core';
import { ICustomUserRecord, IUserCredentials } from '../helpers/interfaces';
import { SessionService } from '../services/session.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    user !: ICustomUserRecord;
    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private sessionService: SessionService,
        private toastService: ToastService,
    ) {
        this.user = this.sessionService.getSession();
        this.form = this.formBuilder.group({
            currentPassword: ['', [Validators.required, Validators.minLength(6)]],
            newPassword: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    updatePassword() {
        if (this.form.valid) {
        }
        else {
            this.generateErrorMessages();
        }
    }

    get currentPasswordControl(): any {
        return this.form.get('currentPassword');
    }

    get newPasswordControl(): any {
        return this.form.get('newPassword');
    }


    private generateErrorMessages() {
        Object.entries(this.form.controls).forEach(([controlName, value]) => {
            if (value.status === "INVALID") {
                value.markAsDirty();
                this.toastService.showErrorToast(`${controlName}: ${value.status.toLowerCase()}`);
            }
        });
    }
}

import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TOAST_SEVERITY } from '../helpers/enums';

@Injectable({
    providedIn: 'root',
})
export class ToastService {

    constructor(private messageService: MessageService) { }

    showSuccessToast(detail: string, duration = 3000) {
        this.showToast(TOAST_SEVERITY.SUCCCESS, "Success", detail, duration);
    }

    showInfoToast(detail: string, duration = 3000) {
        this.showToast(TOAST_SEVERITY.INFO, "Info", detail, duration);
    }

    showWarnToast(detail: string, duration = 3000) {
        this.showToast(TOAST_SEVERITY.WARN, "Warning", detail, duration);
    }

    showErrorToast(detail: string, duration = 3000) {
        this.showToast(TOAST_SEVERITY.ERROR, "Error", detail, duration);
    }

    private showToast(severity: TOAST_SEVERITY, summary: string, detail: string, duration: number) {
        this.messageService.add({
            severity: severity,
            summary: summary,
            detail: detail,
            life: duration,
        });
    }

}

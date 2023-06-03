import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TOAST_SEVERITY } from '../helpers/enums';

@Injectable({
    providedIn: 'root',
})
export class ToastService {

    constructor(private messageService: MessageService) { }

    showSuccessToast(detail: string) {
        this.showToast(TOAST_SEVERITY.SUCCCESS, "Success", detail);
    }

    showInfoToast(detail: string) {
        this.showToast(TOAST_SEVERITY.INFO, "Info", detail);
    }

    showWarnToast(detail: string) {
        this.showToast(TOAST_SEVERITY.WARN, "Warning", detail);
    }

    showErrorToast(detail: string) {
        this.showToast(TOAST_SEVERITY.ERROR, "Error", detail);
    }

    private showToast(severity: TOAST_SEVERITY, summary: string, detail: string) {
        this.messageService.add({
            severity: severity,
            summary: summary,
            detail: detail,
        });
    }

}

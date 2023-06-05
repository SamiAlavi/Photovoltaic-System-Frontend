import { Injectable } from '@angular/core';
import AppSettings from '../AppSettings';

@Injectable({
    providedIn: 'root',
})
export class SessionService {
    private readonly SESSION_KEY = AppSettings.SESSION_KEY;

    saveSession(accessToken: any): void {
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(accessToken));
    }

    getSession(): any {
        const accessToken = localStorage.getItem(this.SESSION_KEY);
        return accessToken ? JSON.parse(accessToken) : null;
    }

    isAuthenticated(): boolean {
        return !!this.getSession();
    }

    clearSession(): void {
        localStorage.removeItem(this.SESSION_KEY);
    }
}

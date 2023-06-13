import { Injectable } from '@angular/core';
import AppSettings from '../AppSettings';
import { ICustomUserRecord } from '../helpers/interfaces';

@Injectable({
    providedIn: 'root',
})
export class SessionService {
    private readonly SESSION_KEY = AppSettings.SESSION_KEY;

    saveSession(user: ICustomUserRecord): void {
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    }

    getSession(): ICustomUserRecord {
        const user = JSON.parse(localStorage.getItem(this.SESSION_KEY) ?? "{}");
        return user;
    }

    isAuthenticated(): boolean {
        const user = this.getSession();
        return !!(user.accessToken && user.uid);
    }

    clearSession(): void {
        localStorage.removeItem(this.SESSION_KEY);
    }
}

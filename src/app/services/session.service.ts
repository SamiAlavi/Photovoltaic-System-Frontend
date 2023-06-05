import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SessionService {
    private readonly SESSION_KEY = 'session';

    saveSession(sessionData: any): void {
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
    }

    getSession(): any {
        const sessionData = localStorage.getItem(this.SESSION_KEY);
        return sessionData ? JSON.parse(sessionData) : null;
    }

    isAuthenticated(): boolean {
        return !!this.getSession();
    }

    clearSession(): void {
        localStorage.removeItem(this.SESSION_KEY);
    }
}

import { HttpClient } from '@angular/common/http';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
    let guard: AuthGuard;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: Router, useValue: {} },
            ]
        })
            .compileComponents();
        guard = TestBed.inject(AuthGuard);
    }));

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });
});

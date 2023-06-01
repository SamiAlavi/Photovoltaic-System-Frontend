import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

@NgModule({
    exports: [
        CardModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        ToastModule,
    ],
})
export class NgPrimeModule { }

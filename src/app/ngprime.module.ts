import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { FieldsetModule } from 'primeng/fieldset';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
    exports: [
        CardModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        ToastModule,
        FieldsetModule,
        DropdownModule,
    ],
})
export class NgPrimeModule { }

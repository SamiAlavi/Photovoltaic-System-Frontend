import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { FieldsetModule } from 'primeng/fieldset';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { TooltipModule } from 'primeng/tooltip';
import { AccordionModule } from 'primeng/accordion';
import { DockModule } from 'primeng/dock';
import { DynamicDialogModule } from 'primeng/dynamicdialog';


@NgModule({
    exports: [
        CardModule,
        ButtonModule,
        InputTextModule,
        PasswordModule,
        ToastModule,
        FieldsetModule,
        DropdownModule,
        MenubarModule,
        TooltipModule,
        AccordionModule,
        DockModule,
        DynamicDialogModule,
    ],
})
export class NgPrimeModule { }

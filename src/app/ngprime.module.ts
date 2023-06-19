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
import { TabViewModule } from 'primeng/tabview';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { InputNumberModule } from 'primeng/inputnumber';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AutoFocusModule } from 'primeng/autofocus';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { SelectButtonModule } from 'primeng/selectbutton';

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
        TabViewModule,
        SidebarModule,
        TableModule,
        ScrollPanelModule,
        InputNumberModule,
        DynamicDialogModule,
        AutoFocusModule,
        ConfirmDialogModule,
        DividerModule,
        ChartModule,
        SelectButtonModule,
    ],
})
export class NgPrimeModule { }

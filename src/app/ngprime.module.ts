import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@NgModule({
    exports: [
        CardModule,
        ButtonModule,
    ],
})
export class NgPrimeModule { }

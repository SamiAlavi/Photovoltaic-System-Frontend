import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';
import { ProductComponent } from '../product/product.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [DialogService],
})
export class DashboardComponent implements OnInit {
    ref!: DynamicDialogRef;
    items: MenuItem[] = [];

    constructor(private dialogService: DialogService) {

    }

    ngOnInit() {
        this.items = [
            {
                label: 'Products',
                icon: 'https://www.svgrepo.com/download/297104/solar-panel.svg',
                command: this.showProductsDialog,

            },
            // {
            //     label: 'Photos',
            //     icon: 'https://primefaces.org/cdn/primeng/images/dock/photos.svg'
            // },
            // {
            //     label: 'Trash',
            //     icon: 'https://primefaces.org/cdn/primeng/images/dock/trash.png'
            // }
        ];
    }

    private showProductsDialog = () => {
        this.ref = this.dialogService.open(ProductComponent, { header: 'Products' });
    };

}

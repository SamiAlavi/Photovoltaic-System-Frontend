import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    items: MenuItem[] = [];
    sidebarVisible = true;

    constructor() {

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
        this.sidebarVisible = true;
    };

}

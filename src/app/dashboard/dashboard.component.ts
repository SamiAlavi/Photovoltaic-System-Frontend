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
                command: this.toggleProductsDialog,

            },
        ];
    }

    private toggleProductsDialog = () => {
        this.sidebarVisible = !this.sidebarVisible;
    };

}

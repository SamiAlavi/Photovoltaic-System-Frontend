import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    items: MenuItem[] = [];
    sidebarVisible = false;

    constructor() {

    }

    ngOnInit() {
        this.items = [
            {
                label: 'Products',
                icon: 'assets/solar-panel-svgrepo-com.svg',
                command: this.toggleProductsDialog,

            },
        ];
    }

    private toggleProductsDialog = () => {
        this.sidebarVisible = !this.sidebarVisible;
    };

}

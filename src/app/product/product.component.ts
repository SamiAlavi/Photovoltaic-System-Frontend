import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MapService } from '../services/map.service';
import { Helpers } from '../helpers/Helpers';
import { ProjectService } from '../services/project.service';
import { IProductDetail } from '../helpers/interfaces';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    providers: [DialogService],
})
export class ProductComponent {
    @Input() sidebarVisible = false;
    @Output() sidebarVisibleChange = new EventEmitter<any>();

    ref: DynamicDialogRef;

    constructor(
        protected projectService: ProjectService,
        private mapService: MapService,
        private dialogService: DialogService,
    ) {
    }

    visibleChange(event: boolean) {
        this.sidebarVisible = event;
        this.sidebarVisibleChange.emit(this.sidebarVisible);
    }

    getFormattedDateTimeFromTimestamp(timestamp: number): string {
        return Helpers.getFormattedDateTimeFromTimestamp(timestamp);
    }

    viewOnMap(product: IProductDetail) {
        const zoom = 5;
        this.mapService.moveMap(product.lng, product.lat, zoom);
    }

    addProduct() {
        this.ref = this.dialogService.open(AddEditProductComponent, {
            header: `Add Product`,
            width: '70%',
            dismissableMask: true,
            contentStyle: { overflow: 'auto' },
        });
    }

    editProduct(product: IProductDetail) {
        this.ref = this.dialogService.open(AddEditProductComponent, {
            header: `Edit Product`,
            width: '70%',
            dismissableMask: true,
            contentStyle: { overflow: 'auto' },
            data: product
        });
    }

    deleteProduct(product: IProductDetail) {
        // ask for confirmation
        this.projectService.deleteProduct(product).subscribe((_) => {

        });
    }
}

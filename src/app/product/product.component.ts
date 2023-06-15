import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MapService } from '../services/map.service';
import { Helpers } from '../helpers/Helpers';
import { ProjectService } from '../services/project.service';
import { IProductDetail } from '../helpers/interfaces';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    providers: [ConfirmationService],
})
export class ProductComponent {
    @Input() sidebarVisible = false;
    @Output() sidebarVisibleChange = new EventEmitter<any>();

    ref: DynamicDialogRef;

    constructor(
        protected projectService: ProjectService,
        private mapService: MapService,
        private dialogService: DialogService,
        private confirmationService: ConfirmationService,
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
        // update marker on map
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
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete the product?',
            header: 'Delete Product',
            icon: 'pi pi-exclamation-triangle text-red-700',
            accept: () => {
                this.projectService.deleteProduct(product).subscribe((_) => {
                    this.mapService.removeMarker(product.id);
                });
            },
            reject: () => {
            }
        });
    }
}

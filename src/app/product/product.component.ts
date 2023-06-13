import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../services/product.service';
import { IProduct, IProductDetail } from '../helpers/interfaces';
import { ORIENTATION } from '../helpers/enums';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FactorInfoDialogComponent } from '../factor-info-dialog/factor-info-dialog.component';
import { MapService } from '../services/map.service';
import { Helpers } from '../helpers/Helpers';
import { ProjectService } from '../services/project.service';
import { ToastService } from '../services/toast.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    providers: [DialogService],
})
export class ProductComponent {
    @Input() sidebarVisible = false;
    @Output() sidebarVisibleChange = new EventEmitter<any>();

    ref!: DynamicDialogRef;

    selectedProduct!: IProduct;

    orientations = [ORIENTATION.NORTH, ORIENTATION.EAST, ORIENTATION.SOUTH, ORIENTATION.WEST];;
    selectedOrientation!: ORIENTATION;

    tiltAngle!: number;
    latitude!: number;
    longitude!: number;

    constructor(
        protected productService: ProductService,
        private dialogService: DialogService,
        private mapService: MapService,
        protected projectService: ProjectService,
        private toastService: ToastService,
    ) {
    }

    viewOnMap(product: IProductDetail) {
        const zoom = 5;
        this.mapService.moveMap(product.lng, product.lat, zoom);
    }

    visibleChange(event: boolean) {
        this.sidebarVisible = event;
        this.sidebarVisibleChange.emit(this.sidebarVisible);
    }

    showInfoDialog(type: string, value: ORIENTATION | number) {
        this.ref = this.dialogService.open(FactorInfoDialogComponent, {
            header: `${type} Factor Information`,
            width: '70%',
            dismissableMask: true,
            contentStyle: { overflow: 'auto' },
            data: {
                type: type,
                value: value,
            },
        });
    }

    private isLongitudeValid(): boolean {
        return (Helpers.isTypeNumber(this.longitude) && -180 <= this.longitude && this.longitude <= 180);
    }

    private isLatitudeValid(): boolean {
        return (Helpers.isTypeNumber(this.latitude) && -90 <= this.latitude && this.latitude <= 90);
    }

    isButtonEnabled() {
        return (
            this.selectedProduct &&
            this.selectedOrientation &&
            Helpers.isTypeNumber(this.tiltAngle) &&
            this.isLongitudeValid()) &&
            this.isLatitudeValid();
    }

    showProductOnMap(product: IProductDetail) {
        this.mapService.showProductOnMap(product);
        this.mapService.moveMap(product.lng, product.lat);
    }

    async addProduct() {
        if (this.isButtonEnabled()) {
            const region = await this.mapService.reverseGeocode(this.latitude, this.longitude);
            if (!region) {
                const message = "This location has no region. Please choose a valid location.";
                this.toastService.showErrorToast(message);
                return;
            }
            const product: IProductDetail = {
                ...this.selectedProduct,
                id: Helpers.generateUID(),
                orientation: this.selectedOrientation,
                tiltAngle: this.tiltAngle,
                lng: this.longitude,
                lat: this.latitude,
                region: region,
                timestamp: Date.now(),
                isActive: true,
            };
            this.showProductOnMap(product);
            this.projectService.addProduct(product).subscribe((isAdded) => {
                if (isAdded) {
                    const message = "Product Added Successfully";
                    this.toastService.showSuccessToast(message);
                }
                else {
                    const message = "Error Adding Product";
                    this.toastService.showErrorToast(message);
                }
            });
        }
    }

    getFormattedDateTimeFromTimestamp(timestamp: number): string {
        return Helpers.getFormattedDateTimeFromTimestamp(timestamp);
    }
}

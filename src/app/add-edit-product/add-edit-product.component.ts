import { Component } from '@angular/core';
import { FactorInfoDialogComponent } from '../factor-info-dialog/factor-info-dialog.component';
import { Helpers } from '../helpers/Helpers';
import { ORIENTATION } from '../helpers/enums';
import { IProduct, IProductDetail } from '../helpers/interfaces';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MapService } from '../services/map.service';
import { ToastService } from '../services/toast.service';
import { ProjectService } from '../services/project.service';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'app-add-edit-product',
    templateUrl: './add-edit-product.component.html',
    styleUrls: ['./add-edit-product.component.scss'],
    providers: [DialogService],
})
export class AddEditProductComponent {

    ref!: DynamicDialogRef;

    constructor(
        protected productService: ProductService,
        protected projectService: ProjectService,
        private dialogService: DialogService,
        private mapService: MapService,
        private toastService: ToastService,
    ) { }

    selectedProduct!: IProduct;

    orientations = [ORIENTATION.NORTH, ORIENTATION.EAST, ORIENTATION.SOUTH, ORIENTATION.WEST];;
    selectedOrientation!: ORIENTATION;

    tiltAngle!: number;
    latitude!: number;
    longitude!: number;


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

}

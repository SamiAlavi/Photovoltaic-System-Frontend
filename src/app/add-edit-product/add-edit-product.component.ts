import { Component, OnInit } from '@angular/core';
import { FactorInfoDialogComponent } from '../factor-info-dialog/factor-info-dialog.component';
import { Helpers } from '../helpers/Helpers';
import { ORIENTATION } from '../helpers/enums';
import { IProduct, IProductDetail } from '../helpers/interfaces';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MapService } from '../services/map.service';
import { ToastService } from '../services/toast.service';
import { ProjectService } from '../services/project.service';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'app-add-edit-product',
    templateUrl: './add-edit-product.component.html',
    styleUrls: ['./add-edit-product.component.scss'],
})
export class AddEditProductComponent implements OnInit {

    selectedProduct!: IProduct;

    orientations = [ORIENTATION.NORTH, ORIENTATION.EAST, ORIENTATION.SOUTH, ORIENTATION.WEST];;
    selectedOrientation!: ORIENTATION;

    tiltAngle!: number;
    latitude!: number;
    longitude!: number;

    isEditMode = false;
    label = "Add";

    constructor(
        protected productService: ProductService,
        protected projectService: ProjectService,
        private dialogService: DialogService,
        private mapService: MapService,
        private toastService: ToastService,
        private config: DynamicDialogConfig,
        private ref: DynamicDialogRef,
    ) { }


    ngOnInit() {
        // Access the passed data
        const data: IProductDetail = this.config.data;
        if (data) {
            this.selectedProduct = this.productService.products.find((prod) => prod.name === data.name);
            this.selectedOrientation = data.orientation;
            this.tiltAngle = data.tiltAngle;
            this.longitude = data.lng;
            this.latitude = data.lat;

            if (this.selectedProduct && this.selectedOrientation && this.tiltAngle && this.longitude && this.latitude) {
                this.isEditMode = true;
                this.label = "Edit";
            }
        }
    }


    showInfoDialog(type: string, value: ORIENTATION | number) {
        this.dialogService.open(FactorInfoDialogComponent, {
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

    onSubmit() {
        if (this.isButtonEnabled()) {
            if (this.isEditMode) {
                this.editProduct();
            }
            else {
                this.addProduct();
            }
        }
    }

    async addProduct() {
        const region = await this.mapService.reverseGeocode(this.latitude, this.longitude);
        if (!region) {
            const message = "This location has no region. Please choose a valid location.";
            this.toastService.showErrorToast(message);
            return;
        }
        const id = Helpers.generateUID();
        const timestamp = Date.now();
        const isActive = true;

        const product: IProductDetail = {
            ...this.selectedProduct,
            id: id,
            orientation: this.selectedOrientation,
            tiltAngle: this.tiltAngle,
            region: region,
            timestamp: timestamp,
            isActive: isActive,
            lng: this.longitude,
            lat: this.latitude,
        };

        this.showProductOnMap(product);
        this.projectService.addProduct(product).subscribe((isAdded) => {
            if (isAdded) {
                const message = "Product Added Successfully";
                this.toastService.showSuccessToast(message);
                this.ref.close();
            }
            else {
                const message = "Error Adding Product";
                this.toastService.showErrorToast(message);
            }
        });
    }

    editProduct() {
        const { region, id, timestamp, isActive } = this.config.data;
        const product: IProductDetail = {
            ...this.selectedProduct,
            id: id,
            orientation: this.selectedOrientation,
            tiltAngle: this.tiltAngle,
            region: region,
            timestamp: timestamp,
            isActive: isActive,
            lng: this.longitude,
            lat: this.latitude,
        };

        this.projectService.editProduct(product).subscribe((isAdded) => {
            if (isAdded) {
                const message = "Product Edited Successfully";
                this.toastService.showSuccessToast(message);
                this.ref.close();
            }
            else {
                const message = "Error Editing Product";
                this.toastService.showErrorToast(message);
            }
        });

    }

}

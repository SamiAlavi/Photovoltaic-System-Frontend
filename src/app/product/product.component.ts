import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../services/product.service';
import { IOrientation, IProduct, IProductDetail } from '../helpers/interfaces';
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

    orientations: IOrientation[] = [];
    selectedOrientation!: IOrientation;

    tiltAngle!: number;
    latitude!: number;
    longitude!: number;

    constructor(
        protected productService: ProductService,
        private dialogService: DialogService,
        private mapService: MapService,
        private projectService: ProjectService,
        private toastService: ToastService,
    ) {
        this.setOrientations();
    }

    setOrientations() {
        this.orientations = [
            { label: "North", value: ORIENTATION.NORTH },
            { label: "East", value: ORIENTATION.EAST },
            { label: "South", value: ORIENTATION.SOUTH },
            { label: "West", value: ORIENTATION.WEST },
        ];
    }

    visibleChange(event: boolean) {
        this.sidebarVisible = event;
        this.sidebarVisibleChange.emit(this.sidebarVisible);
    }

    showInfoDialog(type: string, value: IOrientation | number) {
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

    onLocationChange() {
        this.mapService.moveMap(this.longitude, this.latitude);
    }

    isButtonEnabled() {
        return (
            this.selectedProduct &&
            this.selectedOrientation &&
            Helpers.isTypeNumber(this.tiltAngle) &&
            this.isLongitudeValid()) &&
            this.isLatitudeValid();
    }

    addProduct() {
        if (this.isButtonEnabled()) {
            this.onLocationChange();
            const product: IProductDetail = {
                ...this.selectedProduct,
                id: Helpers.generateUID(),
                orientation: this.selectedOrientation.value,
                tiltAngle: this.tiltAngle,
                lng: this.longitude,
                lat: this.latitude,
                timestamp: Date.now(),
            };
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

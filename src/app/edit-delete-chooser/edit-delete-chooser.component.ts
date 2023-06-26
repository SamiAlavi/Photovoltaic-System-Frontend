import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IProductDetail } from '../helpers/interfaces';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';
import { ToastService } from '../services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { ProjectService } from '../services/project.service';
import { MapService } from '../services/map.service';

@Component({
    selector: 'app-edit-delete-chooser',
    templateUrl: './edit-delete-chooser.component.html',
    styleUrls: ['./edit-delete-chooser.component.scss'],
})
export class EditDeleteChooserComponent implements OnInit {
    product: IProductDetail;

    constructor(
        private ref: DynamicDialogRef,
        private dialogService: DialogService,
        private config: DynamicDialogConfig,
        private toastService: ToastService,
        private confirmationService: ConfirmationService,
        private projectService: ProjectService,
        private mapService: MapService,
    ) { }


    ngOnInit() {
        this.product = this.config.data;
    }

    editViewProduct() {
        this.dialogService.open(AddEditProductComponent, {
            header: this.product.isActive ? `Edit Product` : `View Product`,
            width: '70%',
            dismissableMask: true,
            contentStyle: { overflow: 'auto' },
            data: this.product,
        });
        this.ref.close();
    }

    deleteProduct() {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete the product?',
            header: 'Delete Product',
            icon: 'pi pi-exclamation-triangle text-red-700',
            accept: () => {
                this.projectService.deleteProduct(this.product).subscribe((_) => {
                    this.mapService.removeMarker(this.product.id);
                });
            },
            reject: () => {
            }
        });
        this.ref.close();
    }
}

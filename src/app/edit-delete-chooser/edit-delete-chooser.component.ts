import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IProductDetail } from '../helpers/interfaces';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';
import { ToastService } from '../services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { ProjectService } from '../services/project.service';
import { MapService } from '../services/map.service';
import { WeatherReportChartComponent } from '../weather-report-chart/weather-report-chart.component';

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


    editViewProduct(product: IProductDetail) {
        this.dialogService.open(AddEditProductComponent, {
            header: product.isActive ? `Edit Product` : 'View Product',
            width: '70%',
            dismissableMask: true,
            contentStyle: { overflow: 'auto' },
            data: product
        });
        this.ref.close();
    }

    generateReport(product: IProductDetail) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to generate the report for last 30 days? The product will go into read-only state.',
            header: 'Generate Product Report',
            icon: 'pi pi-exclamation-triangle text-red-700',
            accept: () => {
                this.projectService.generateProductReport(product).subscribe((_) => {
                    this.viewReport(product);
                    this.mapService.removeMarker(product.id);
                    this.mapService.addMarker(product);
                });
            },
            reject: () => {
            }
        });
    }

    viewReport(product: IProductDetail) {
        this.dialogService.open(WeatherReportChartComponent, {
            header: `Electricity Generation Report - ${product.name} (${product.id})`,
            width: '100%',
            height: '100%',
            dismissableMask: true,
            maximizable: true,
            contentStyle: { overflow: 'auto' },
            data: product.report
        });
        this.ref.close();
    }


    deleteProduct(product: IProductDetail) {
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
        this.ref.close();
    }
}

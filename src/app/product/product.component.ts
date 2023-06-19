import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MapService } from '../services/map.service';
import { Helpers } from '../helpers/Helpers';
import { ProjectService } from '../services/project.service';
import { IProductDetail } from '../helpers/interfaces';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';
import { ConfirmationService } from 'primeng/api';
import { WeatherReportChartComponent } from '../weather-report-chart/weather-report-chart.component';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
    @Input() sidebarVisible = false;
    @Output() sidebarVisibleChange = new EventEmitter<any>();

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
        this.mapService.viewOnMap(product);
    }

    addProduct() {
        this.dialogService.open(AddEditProductComponent, {
            header: `Add Product`,
            width: '70%',
            dismissableMask: true,
            contentStyle: { overflow: 'auto' },
        });
    }

    editProduct(product: IProductDetail) {
        this.dialogService.open(AddEditProductComponent, {
            header: `Edit Product`,
            width: '70%',
            dismissableMask: true,
            contentStyle: { overflow: 'auto' },
            data: product
        });
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
            header: `Electricity Generation Report - ${product.name}`,
            width: '100%',
            height: '100%',
            dismissableMask: true,
            maximizable: true,
            contentStyle: { overflow: 'auto' },
            data: product.report
        });
    }
}

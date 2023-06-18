import { Component } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IReportJSON } from '../helpers/interfaces';

@Component({
    selector: 'app-weather-report-chart',
    templateUrl: './weather-report-chart.component.html',
    styleUrls: ['./weather-report-chart.component.scss']
})
export class WeatherReportChartComponent {
    weatherData!: any;
    options!: any;

    constructor(
        private dialogService: DialogService,
        private config: DynamicDialogConfig,
        private ref: DynamicDialogRef,
    ) { }


    ngOnInit() {
        const data: IReportJSON = this.config.data;
        if (data) {
            this.initChart(data);
        }
    }

    initChart(data: IReportJSON) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        console.log(data.datetimes);
        console.log(data.electrictyProduced);
    }
}

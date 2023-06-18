import { Component } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IReportJSON } from '../helpers/interfaces';

@Component({
    selector: 'app-weather-report-chart',
    templateUrl: './weather-report-chart.component.html',
    styleUrls: ['./weather-report-chart.component.scss']
})
export class WeatherReportChartComponent {
    reportData!: any;
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


        this.reportData = {
            labels: data.datetimes,
            datasets: [
                {
                    label: 'Electricity Produced',
                    data: data.electrictyProduced,
                    fill: true,
                    tension: 0.4
                },
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }
}

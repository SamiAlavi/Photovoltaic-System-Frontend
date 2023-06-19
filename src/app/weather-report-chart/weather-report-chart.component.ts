import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IReportJSON } from '../helpers/interfaces';

@Component({
    selector: 'app-weather-report-chart',
    templateUrl: './weather-report-chart.component.html',
    styleUrls: ['./weather-report-chart.component.scss']
})
export class WeatherReportChartComponent implements OnInit {
    reportData!: any;
    options!: any;
    stateOptions = [{ label: 'Hourly', value: 'hourly' }, { label: 'Daily', value: 'daily' }];
    value = 'hourly';
    private data!: IReportJSON;

    constructor(
        private dialogService: DialogService,
        private config: DynamicDialogConfig,
        private ref: DynamicDialogRef,
    ) { }


    ngOnInit() {
        this.data = this.config.data;
        if (this.data) {
            this.initChart();
        }
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.onChange("hourly");

        this.options = {
            responsive: true,
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
                    },
                },
            }
        };
    };

    onChange(type: string) {
        if (type === "hourly") {
            this.setXYData(this.data.hourly.datetimes, this.data.hourly.electrictyProduced);
        }
        else if (type === "daily") {
            this.setXYData(this.data.daily.datetimes, this.data.daily.electrictyProduced);
        }
    }

    private setXYData(xAxis: string[], yAxis: number[]) {
        this.reportData = {
            labels: xAxis,
            datasets: [
                {
                    label: 'Electricity Produced',
                    data: yAxis,
                    fill: true,
                    tension: 0.4
                },
            ]
        };
    }
}

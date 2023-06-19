import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IReportJSON } from '../helpers/interfaces';
import { ChartOptions } from 'chart.js';
import { Helpers } from '../helpers/Helpers';

@Component({
    selector: 'app-weather-report-chart',
    templateUrl: './weather-report-chart.component.html',
    styleUrls: ['./weather-report-chart.component.scss']
})
export class WeatherReportChartComponent implements OnInit {
    reportData!: any;
    options!: ChartOptions;
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
            this.data.hourly.datetimes = this.data.hourly.datetimes.map((val) => Helpers.convertDatetime(val));
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
            animation: {
                duration: 2000,
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Datetime',
                        color: textColorSecondary,
                    },
                    ticks: {
                        color: textColorSecondary,
                        stepSize: 24, // Step size between major ticks
                    },
                    grid: {
                        color: surfaceBorder,
                    }
                },
                y: {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Electricity Generated (kWh)',
                        color: textColorSecondary,
                    },
                    ticks: {
                        color: textColorSecondary,
                        callback: value => `${value} kWh`,
                    },
                    grid: {
                        color: surfaceBorder,
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
                    label: 'Electricity Generated',
                    data: yAxis,
                    fill: true,
                    tension: 0.2,
                    pointHoverRadius: 15,
                },
            ]
        };
    }
}

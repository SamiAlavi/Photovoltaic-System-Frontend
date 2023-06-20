import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IReportJSON } from '../helpers/interfaces';
import { Chart, ChartOptions } from 'chart.js';
import { Helpers } from '../helpers/Helpers';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-weather-report-chart',
    templateUrl: './weather-report-chart.component.html',
    styleUrls: ['./weather-report-chart.component.scss']
})
export class WeatherReportChartComponent implements OnInit, AfterViewInit {
    @ViewChild('chart') chart: any;

    reportData!: any;
    options!: ChartOptions;
    private data!: IReportJSON;
    private canvas!: HTMLCanvasElement;

    stateOptions = [{ label: 'Hourly', value: 'hourly' }, { label: 'Daily', value: 'daily' }];
    downloadOptions = [
        { label: 'JSON', icon: 'pi pi-file', value: 'json', command: () => this.downloadJSON() },
        { label: 'PNG', icon: 'pi pi-image', value: 'png', command: () => this.downloadCanvasAsPNG() }
    ];
    value = 'hourly';

    constructor(
        private config: DynamicDialogConfig,
    ) { }


    ngOnInit() {
        this.data = this.config.data;
        if (this.data) {
            this.data.hourly.datetimes = this.data.hourly.datetimes.map((val) => Helpers.convertDatetime(val));
            this.initChart();
        }
    }

    ngAfterViewInit() {
        const chartInstance: Chart = this.chart.chart;
        this.canvas = chartInstance.ctx.canvas;
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.onStateChange("hourly");

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

    onStateChange(type: string) {
        if (type === "hourly") {
            this.setXYData(this.data.hourly.datetimes, this.data.hourly.electrictyProduced);
        }
        else if (type === "daily") {
            this.setXYData(this.data.daily.datetimes, this.data.daily.electrictyProduced);
        }
    }

    showMenu() {

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

    downloadJSON() {
        const jsonData = this.data;

        const jsonBlob = new Blob([JSON.stringify(jsonData, null, 4)], { type: 'application/json' });
        const dataUrl = URL.createObjectURL(jsonBlob);
        this.download(dataUrl, "json");
    }

    downloadCanvasAsPNG() {
        if (!this.canvas) {
            return;
        }
        const dataUrl = this.canvas.toDataURL("image/png");
        this.download(dataUrl, "png");
    }

    private download(dataUrl: string, extension: string) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${this.config.header}.${extension}`;
        link.click();
        URL.revokeObjectURL(dataUrl);
    }

}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IReportJSON } from '../helpers/interfaces';
import { Chart, ChartOptions } from 'chart.js';
import { Helpers } from '../helpers/Helpers';
import zoomPlugin from 'chartjs-plugin-zoom';

@Component({
    selector: 'app-weather-report-chart',
    templateUrl: './weather-report-chart.component.html',
    styleUrls: ['./weather-report-chart.component.scss']
})
export class WeatherReportChartComponent implements OnInit, AfterViewInit {
    @ViewChild('hourlyChart') hourlyChart: any;
    @ViewChild('dailyChart') dailyChart: any;

    hourlyReportData!: any;
    dailyReportData!: any;
    hourlyOptions!: ChartOptions;
    dailyOptions!: ChartOptions;

    private data!: IReportJSON;

    stateOptions = [{ label: 'Hourly', value: 'hourly' }, { label: 'Daily', value: 'daily' }];
    downloadOptions = [
        { label: 'JSON', icon: 'pi pi-file', value: 'json', command: () => this.downloadJSON() },
        { label: 'PNG', icon: 'pi pi-image', value: 'png', command: () => this.downloadCanvasAsPNG() }
    ];
    value = 'hourly';
    animationDuration = 2000;

    constructor(
        private config: DynamicDialogConfig,
    ) { }


    ngOnInit() {
        Chart.register(zoomPlugin);

        this.data = this.config.data;
        if (this.data) {
            this.data.hourly.datetimes = this.data.hourly.datetimes.map((val) => Helpers.convertDatetime(val));
            // this.data.hourly.electrictyProduced = this.data.hourly.electrictyProduced.map((val) => +val.toFixed(5));
            // this.data.daily.electrictyProduced = this.data.daily.electrictyProduced.map((val) => +val.toFixed(5));
        }
    }

    ngAfterViewInit() {
        this.onStateChange();
    }

    setupChart1() {
        this.hourlyReportData = {
            labels: this.data.hourly.datetimes,
            datasets: [
                {
                    label: 'Electricity Generated',
                    data: this.data.hourly.electrictyProduced,
                    fill: true,
                    tension: 0,
                    pointHoverRadius: 15,
                },
            ]
        };
        this.hourlyOptions = this.setOptions('Datetimes');
    }

    setupChart2() {
        this.dailyReportData = {
            labels: this.data.daily.datetimes,
            datasets: [
                {
                    label: 'Electricity Generated',
                    data: this.data.daily.electrictyProduced,
                    fill: true,
                    tension: 0,
                    pointHoverRadius: 15,
                },
            ]
        };
        this.dailyOptions = this.setOptions('Dates');
    }

    setOptions(xAxisLabel: string): ChartOptions {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        return {
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            animation: {
                duration: this.animationDuration,
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                },
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'xy',
                    },
                    zoom: {
                        wheel: {
                            enabled: true,
                        },
                        pinch: {
                            enabled: true
                        },
                        mode: 'xy',
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: xAxisLabel,
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

    }

    onStateChange() {
        setTimeout(() => {
            this.setupChart1();
            this.setupChart2();
            this.animationDuration = 0;
        }, 1000);
    }

    getCurrentChartInstance(): Chart {
        return this.value === "hourly" ? this.hourlyChart.chart : this.dailyChart.chart;
    }

    downloadJSON() {
        const jsonData = this.data;
        const jsonBlob = new Blob([JSON.stringify(jsonData, null, 4)], { type: 'application/json' });
        const dataUrl = URL.createObjectURL(jsonBlob);
        this.downloadData(dataUrl, "json");
    }

    downloadCanvasAsPNG() {
        const canvas = this.getCurrentChartInstance().ctx.canvas;
        if (!canvas) {
            return;
        }
        const dataUrl = canvas.toDataURL("image/png");
        this.downloadData(dataUrl, "png");
    }

    private downloadData(dataUrl: string, extension: string) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${this.config.header}.${extension}`;
        link.click();
        URL.revokeObjectURL(dataUrl);
    }

}

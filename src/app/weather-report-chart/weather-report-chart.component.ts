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
    @ViewChild('chart') chart: any;

    reportData!: any;
    options!: ChartOptions;
    private data!: IReportJSON;
    private chartInstance!: Chart;

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
        Chart.register(zoomPlugin);

        this.data = this.config.data;
        if (this.data) {
            this.data.hourly.datetimes = this.data.hourly.datetimes.map((val) => Helpers.convertDatetime(val));
            this.initChart();
        }
    }

    ngAfterViewInit() {
        this.chartInstance = this.chart.chart;
    }

    initChart() {
        this.setOptions();
        this.onStateChange("hourly");
    };

    setOptions() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

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
                zoom: {
                    pan: {
                        enabled: false,
                        mode: 'xy',
                    },
                    zoom: {
                        wheel: {
                            enabled: false,
                        },
                        pinch: {
                            enabled: false
                        },
                        mode: 'xy',
                    }
                }
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

    }

    onStateChange(type: string) {
        if (type === "hourly") {
            this.setXYData(this.data.hourly.datetimes, this.data.hourly.electrictyProduced);
            this.options.scales['x']['title']['text'] = "Datetimes";
        }
        else if (type === "daily") {
            this.setXYData(this.data.daily.datetimes, this.data.daily.electrictyProduced);
            this.options.scales['x']['title']['text'] = "Dates";
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
                    tension: 0,
                    pointHoverRadius: 15,
                },
            ]
        };
    }

    downloadJSON() {
        const jsonData = this.data;
        const jsonBlob = new Blob([JSON.stringify(jsonData, null, 4)], { type: 'application/json' });
        const dataUrl = URL.createObjectURL(jsonBlob);
        this.downloadData(dataUrl, "json");
    }

    downloadCanvasAsPNG() {
        const canvas = this.chartInstance.ctx.canvas;
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

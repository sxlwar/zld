import { Injectable } from "@angular/core";
import Chart from 'chart.js';

export interface ChartSourceData {
    labels: string[];
    data: number[];
}

export interface ChartItem {
    hoverBackgroundColor: string[];
    backgroundColor: string[];
    data: number[];
    label?: string;
}

export interface ChartData {
    labels: string[];
    datasets: ChartItem[];
    options?: any;
}

export enum ChartType {
    pie = 'pie',
    doughnut = 'doughnut',
    bar = 'bar'
}

const COLORS = [
    'rgba(255,99,132,.8)',
    'rgba(54,162,235,.8)',
    'rgba(255,206,86,.8)',
    'rgba(34,139,34,.8)',
    'rgba(72,209,204,.8)',
    'rgba(119,136,153,.8)',
    'rgba(153,51,51,.8)',
    'rgba(250,250,210,.8)',
    'rgba(0,255,255,.8)',
    'rgba(102,102,153,.8)',
]

@Injectable()
export class ChartService {
    constructor() { }

    getChart(context, chartType, data, options?) {
        return new Chart(context, {
            data,
            options,
            type: chartType,
        });
    }

<<<<<<< HEAD
    getPieChartData(sourceData: ChartSourceData): ChartData {

        const backgroundColor = COLORS.slice(0, sourceData.data.length);

=======
    getAttendanceTimeChart(sourceData: ChartSourceData): ChartData {
        const backgroundColor = COLORS.slice(0, sourceData.data.length);

        const hoverBackgroundColor = this.generateHoverColor(backgroundColor);

        return {
            labels: sourceData.labels,
            datasets: [{
                hoverBackgroundColor,
                backgroundColor,
                data: sourceData.data
            }
            ]
        }
    }

    getAttendanceStatisticsTeamChart(sourceData: ChartSourceData): ChartData {

        const backgroundColor = COLORS.slice(0, sourceData.data.length);

>>>>>>> 3fe9fa80b230ba4d5ad22c88e69fb1f23bd5d408
        const hoverBackgroundColor = this.generateHoverColor(backgroundColor);

        return {
            labels: sourceData.labels,
            datasets: [
                {
                    backgroundColor,
                    hoverBackgroundColor,
                    data: sourceData.data
                }
            ]
        }
    }

<<<<<<< HEAD
    getBarChartData(sourceData: ChartSourceData): ChartData {
=======
    getAttendanceStatisticsDayChart(sourceData: ChartSourceData): ChartData {
>>>>>>> 3fe9fa80b230ba4d5ad22c88e69fb1f23bd5d408
        const backgroundColor = COLORS.slice(0, sourceData.data.length);

        const hoverBackgroundColor = this.generateHoverColor(backgroundColor);


        const data = sourceData.data.slice(0, 7);

        return {
            labels: sourceData.labels.slice(0, 7),
            datasets: [
                {
                    label: '未确认数量',
                    backgroundColor,
                    hoverBackgroundColor,
                    data
                }
            ]
        }
    }

    generateHoverColor(colors: string[]): string[] {
        const reg = /\.\d{1}/;

        return colors.map(color => color.replace(reg, '1'));
    }
}
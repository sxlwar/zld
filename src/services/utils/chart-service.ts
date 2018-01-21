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
    bar = 'bar',
    horizontalBar = 'horizontalBar'
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
    'rgba(2,102,153,.8)',
    'rgba(127,255,0,.8)',
    'rgba(255,255,0,.8)',
    'rgba(255,0,0,.8)',
    'rgba(105,105,105,.8)',
    'rgba(7,130,180,.8)',
    'rgba(0,128,0,.8)',
    'rgba(255,182,193,.8)',
    'rgba(216,191,216,.8)',
    'rgba(186,85,211,.8)',
    'rgba(112,128,144,.8)',
    'rgba(0,128,128,.8)',
    'rgba(210,180,140,.8)',
    'rgba(178,34,34,.8)',
    'rgba(47,79,79,.8)',
    'rgba(0,0,128,.8)',
    'rgba(70,0,130,.8)',
    'rgba(255,0,255,.8)',
    'rgba(0,100,0,.8)',
    'rgba(128,0,0,.8)',
    'rgba(0,0,0,.8)',
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

    getPieChartData(sourceData: ChartSourceData): ChartData {
        const backgroundColor = COLORS.slice(0, sourceData.data.length);

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

    getBarChartData(sourceData: ChartSourceData, legendLabel: string, maxCount = 7, colorPercent = 1): ChartData {
        let backgroundColor = COLORS.slice(0, sourceData.data.length);

        if (colorPercent !== 1) backgroundColor = this.generateHoverColor(backgroundColor, colorPercent);

        const hoverBackgroundColor = this.generateHoverColor(backgroundColor);

        const data = sourceData.data.slice(0, maxCount);

        return {
            labels: sourceData.labels.slice(0, maxCount),
            datasets: [
                {
                    label: legendLabel,
                    backgroundColor,
                    hoverBackgroundColor,
                    data
                }
            ]
        }
    }

    generateHoverColor(colors: string[], opacity = 1): string[] {
        const reg = /0?\.\d{1}/;

        return colors.map(color => color.replace(reg, String(opacity)));
    }
}
import { Injectable } from "@angular/core";
import Chart from 'chart.js';

export interface ChartSourceData {
    labels: string[];
    data: number[];
}

export enum ChartType {
    pie = 'pie'
}
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

    getAttendanceTimeChart(sourceData: ChartSourceData) {
        const backgroundColor = ['#FF6384', '#36A2EB', '#FFCE56'];

        const hoverBackgroundColor = ['#FF6384', '#36A2EB', '#FFCE56'];

        return {
            labels: sourceData.labels,
            datasets: [
                {
                    hoverBackgroundColor,
                    backgroundColor,
                    data: sourceData.data
                }
            ]
        }
    }
}
import { Injectable } from '@angular/core';
import { Base } from './util';

export interface Calendar {
    week: string;
    days: Date[];
}

export interface DateInfo {
    fullDate: string;
    shortDate: string;
    time: string;
    dateWithoutDay: string;
    week: number;
}

export const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

export const monthShortNames = monthNames;

export const dayNames = ['日', '一', '二', '三', '四', '五', '六'];

export const dayShortNames = dayNames;

@Injectable()
export class TimeService extends Base {
    constructor() {
        super();
    }

    toTwo(s: string): string {
        let str = String(s);
        return str.length > 1 ? str : `0${str}`;
    }

    getTime(isFull = true) {
        const date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            second = date.getSeconds();

        const d = year + '-' + this.toTwo(String(month)) + '-' + this.toTwo(String(day));

        const t = this.toTwo(String(hour)) + ':' + this.toTwo(String(minute)) + ':' + this.toTwo(String(second));

        return isFull ? d + ' ' + t : t;
    }

    getDate(date: Date, isFullDate: boolean): string {
        let y = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate();
        const m = this.toTwo(String(month));
        const d = this.toTwo(String(day));
        return isFullDate ? y + '-' + m + '-' + d : m + '-' + d;
    }

    withOutSecond(str = ''): string {
        if (!str) return str;
        const ary = str.split(':');
        ary.pop();
        return ary.join(':');
    }

    /*以date为基准生成日历，full为真时生成当月日历，为假时生成当周的日历
     * 复杂高的原因：1、参数决定日历形式是当月还是当周
     * 2、当月和当周的边界值不同
     * 3、当月和当周起始值不同，当月用日期，当周用星期数
     * 以起始值为界，先算起始值之前的日期，再算起始值之后的日期*/

    // eslint-disable-next-line complexity
    createCalendar(date: Date, full: Boolean): Calendar[] {
        let result = [
            {
                week: '日',
                days: []
            },
            {
                week: '一',
                days: []
            },
            {
                week: '二',
                days: []
            },
            {
                week: '三',
                days: []
            },
            {
                week: '四',
                days: []
            },
            {
                week: '五',
                days: []
            },
            {
                week: '六',
                days: []
            }],
            millionSeconds = date.getTime(),
            max = full ? this.getLastDayOfMonth(date) : 6,
            min = full ? 1 : 0,
            current = full ? date.getDate() : date.getDay(),
            val = 0,
            i = 0;

        function predicate() {
            return full ? i >= min : i > min;
        }

        function exec(val) {
            const date = new Date(val),
                index = date.getDay();

            result[index].days.push(date);
        }

        for (i = current - min; predicate(); i -= 1) {
            val = millionSeconds - i * 24 * 3600 * 1000;
            exec(val);
        }

        for (i = 0; i <= max - current; i += 1) {
            val = millionSeconds + i * 24 * 3600 * 1000;
            exec(val);
        }
        return result;
    }

    /*以date为基准获取当前月份最后一天的数值*/
    getLastDayOfMonth(date: Date): number {
        const bigMonth = [1, 3, 5, 7, 8, 10, 12];
        const smallMonth = [4, 6, 9, 11];
        const month = date.getMonth() + 1;

        if (bigMonth.indexOf(month) !== -1) {
            return 31;
        }
        if (smallMonth.indexOf(month) !== -1) {
            return 30;
        }

        return this.isLeapYear(date) ? 29 : 28;
    }

    isLeapYear(date: Date): boolean {
        const year = date.getFullYear();
        return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
    }

    isWeekend(date: Date): boolean {
        const week = date.getDay();
        return week === 0 || week === 6;
    }

    isFuture(date: Date): boolean {
        const now = new Date(),
            mNow = now.getTime(),
            mDate = date.getTime();
        return mDate > mNow;
    }

    isTheDate(date: Date): boolean {
        const now = new Date(),
            currentDate = now.getDate(),
            compareDate = date.getDate();
        return currentDate === compareDate;
    }

    getDateInfo(value: Date): DateInfo {
        const obj = new Date(value),
            year = obj.getFullYear(),
            month = obj.getMonth() + 1,
            date = obj.getDate(),
            week = obj.getDay(),
            hours = this.toTwo(String(obj.getUTCHours())),
            minutes = this.toTwo(String(obj.getUTCMinutes()));

        return {
            fullDate: year + '-' + month + '-' + date,
            shortDate: month + '-' + date,
            time: hours + ':' + minutes,
            dateWithoutDay: year + '-' + month,
            week: week
        };
    }

    countDownDays(start: Date, end: Date): number {
        const now = start.getTime();
        const finish = end.getTime();
        const result = (finish - now) / (24 * 3600 * 1000);

        return parseInt(String(result));
    }

    getYesterday(): Date {
        const now = new Date();
        const yesterday = now.getTime() - 24 * 3600 * 1000;
        return new Date(yesterday);
    }

    getNextDay(date: Date): Date {
        const tomorrow = date.getTime() + 24 * 3600 * 1000;

        return new Date(tomorrow);
    }

    isGreatThan(date1: string, date2: string): boolean {
        const str1 = date1.split('-').map(this.toTwo).join('');
        const str2 = date2.split('-').map(this.toTwo).join('');
        return str1 > str2;
    }

    isToday(day: string | Date): boolean {
        const now = new Date();

        // 以/分割的字符串在各浏览器下行为一致
        const date = typeof day === 'string' ? new Date(day.split('-').join('/')) : day;

        return now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth() && now.getDate() === date.getDate();
    }

    isMorningTime(time: string): boolean {
        const hour = parseInt(time);

        return hour >= 0 && hour <= 12;
    }

    isAfternoonTime(time: string): boolean {
        const hour = parseInt(time);

        return hour >= 12 && hour <= 23;
    }

    getFirstDateOfMonth(date: Date): Date {
        const year = date.getFullYear();

        const month = date.getMonth() + 1;

        return new Date(`${year}/${month}/01`);
    }

    getMonthFromStringDate(date: string): string {
        const month = date.split('-')[1];

        const index = parseInt(month);

        return monthNames[index - 1];
    }

    addTime(startTime: string): string {
        const ary = startTime.split(':');

        let hour = parseInt(ary[0]) + 2;

        ary[0] = hour > 23 ? '00' : String(hour);

        return ary.join(':');
    }
}

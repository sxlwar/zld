import { PipeTransform, Pipe } from '@angular/core';

export const messageIcon = [
    'android',
    'apple',
    'aperture',
    'baseball',
    'basketball',
    'bicycle',
    'boat'
]; // 瞎几吧写的，完了再弄

@Pipe({
    name: 'messageIcon'
})
export class MessageIconPipe implements PipeTransform {
    transform(value: number): string {
        return messageIcon[value -1]; // 记得减1,后台用的python序号是从1开始的。
    }
}

@Pipe({
    name: 'messageSplit'
})
export class MessageSplitPipe implements PipeTransform {
    transform(value : string): string[] {
        return value.split('\n');
    }
}

@Pipe({
    name: 'messageParse'
})
export class MessageParsePipe implements PipeTransform {
    transform(value: string): object {
        return JSON.parse(value);
    }
}
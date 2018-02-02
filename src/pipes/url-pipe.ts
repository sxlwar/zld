import { Pipe, PipeTransform } from '@angular/core';
import { ENV } from '@app/env';

@Pipe({
    name: 'imageSrc',
})
export class ImageSrcPipe implements PipeTransform {
    transform(value: string): string {
       return  `http://${ENV.DOMAIN}/media/${value}`;
    }
}

@Pipe({
    name: 'captchaSrc',
})
export class CaptchaSrcPipe implements PipeTransform {
    transform(value: string): string {
        return `http://${ENV.DOMAIN}/check_captcha/${value}`;
    }
}

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ErrorMessage, ErrorResponse } from '../../interfaces/response-interface';

export interface ErrorInfo {
    title: string;
    msg: ErrorMessage;
    buttons: string[];
}

@Injectable()
export class ErrorService {
    constructor(
        private alertCtrl: AlertController,
        private toastCtrl: ToastController,
        private translate: TranslateService
    ) {
    }

    /**
     * @description
     * Handle errors from server.
     * */
    private handleResponseError(obs: Observable<ErrorInfo>): Subscription {
        return obs
            .filter(info => info.msg && !!info.msg.errorMessage)
            .map(info => this.alertCtrl.create({
                title: info.title,
                subTitle: info.msg.errorMessage,
                buttons: info.buttons,
            }))
            .subscribe(alert => alert.present().then(() => { }));
    }

    /**
     * @description
     * Handle errors from UI.
     * */
    handleUIError(msgKey: string) {
        this.translate.get(msgKey).subscribe(message => {
            const toast = this.toastCtrl.create({
                message,
                duration: 3000,
                position: 'top',
            });
            toast.present().then(() => { });
        });
    }

    /**
     * @description
     * Used to handle the errors on the specified stream. The stream should be  a request stream.
     * */
    handleErrorInSpecific(obs: Observable<ErrorResponse>, title = ''): Subscription {
        const button = 'CONFIRM_BUTTON';

        const lang$ = this.translate.get([title, button])
            .map(lang => ({ title: lang[title], buttons: [lang[button]] }));

        const error$: Observable<ErrorInfo> = obs
            .withLatestFrom(lang$)
            .map(res => Object.assign({ msg: res[0] }, res[1]) as ErrorInfo);

        return this.handleResponseError(error$);
    }

    handleApiRequestError(obs: Observable<ErrorResponse>): Subscription {
        return this.handleErrorInSpecific(obs, 'API_ERROR');
    }
}

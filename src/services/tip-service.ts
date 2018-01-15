import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Loading, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

export interface ConfirmProp {
    title?: string;
    message: string;
    cancelText: string;
    confirmText: string;
}

@Injectable()
export class TipService {
    loading: Loading;

    constructor(
        private toastCtrl: ToastController,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController
    ) {
    }

    showServerResponseSuccess(message: string): void {
        this.showTipOnTop(message);
    }

    showTipOnTop(message: string, duration = 3000, position = 'top'): void {
        this.toastCtrl.create({ message, duration, position, }).present().then(() => { });
    }

    loadingSpy(state: Observable<boolean>): Subscription {
        return state
            .subscribe(isLoading => {
                if (isLoading) {
                    this.presentLoading();
                } else {
                    this.dismissLoading();
                }
            });
    }

    presentLoading() {
        this.loading = this.loadingCtrl.create({
            duration: 3000,
            spinner: 'dots',
            content: '图片上传中,请稍侯'
        });

        this.loading.present().then(() => { });
    }

    dismissLoading() {
        this.loading && this.loading.dismiss().then(() => { });
    }

    showConfirmProp(source: Observable<ConfirmProp>, confirmFn, cancelFn = () => { }): Subscription {
        return source.subscribe(data => {
            let confirm = this.alertCtrl.create({
                title: data.title,
                message: data.message,
                buttons: [
                    {
                        text: data.cancelText,
                        handler: cancelFn
                    },
                    {
                        text: data.confirmText,
                        handler: confirmFn
                    }
                ]
            });

            confirm.present().then(_ => { });
        });
    }

    modifyAddressDetail() {
        return this.alertCtrl.create({
            title: '详细地址',
            inputs: [
                {
                    name: 'detail',
                    placeholder: '请输入详细地址'
                }
            ],
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    handler: data => { }
                },
                {
                    text: '确定',
                    handler: data => { }
                }
            ]
        });
    }

    alert(message: Observable<string>, confirmFn = () => { }): Subscription {
        return message.subscribe(subTitle => {
            const alert = this.alertCtrl.create({ subTitle, buttons: ['OK'] });

            alert.present();

            alert.onDidDismiss(confirmFn);
        });
    }
}

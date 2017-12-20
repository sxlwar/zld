import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Loading, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { AppState, selectUploadingState } from '../reducers/index-reducer';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

export interface ConfirmProp {
  title?: string;
  message: string;
  cancelText: string;
  confirmText: string;
}

@Injectable()
export class TipService {
  loading: Loading;
  loading$$: Subscription;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private store: Store<AppState>,
    private alertCtrl: AlertController
  ) {
    this.loadingSpy();
  }

  showServerResponseSuccess(message: string): void {
    const toast = this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top'
    });
    toast.present().then(() => {
    });
  }

  loadingSpy() {
    this.loading$$ = this.store.select(selectUploadingState)
      .subscribe(isLoading => {
        if (isLoading) {
          this.presentLoading();
        } else {
          this.dismissLoading();
        }
      })
  }

  presentLoading() {
    this.loading = this.loadingCtrl.create({
      duration: 3000,
      spinner: 'dots',
      content: '图片上传中,请稍侯'
    });

    this.loading.present().then(() => {
    })
  }

  dismissLoading() {
    if (this.loading) this.loading.dismiss().then(() => {
    });
  }

  showConfirmProp(source: Observable<ConfirmProp>, confirmFn, cancelFn = () => {}): Subscription {
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

      confirm.present().then(_ => {});
    });
  }
  
modifyAddressDetail() {
  return  this.alertCtrl.create({
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
}

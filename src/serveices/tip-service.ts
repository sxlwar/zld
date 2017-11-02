import {Injectable} from '@angular/core';
import {Loading, LoadingController, ToastController} from 'ionic-angular';
import {AppState, selectUploadingState} from '../reducers/index-reducer';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';

@Injectable()
export class TipService {
  loading: Loading;
  loading$$: Subscription;

  constructor(private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private store: Store<AppState>) {
    this.loadingSpy();
  }

  showServerResponseSuccess(message: string): void{
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
}

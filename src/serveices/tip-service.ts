
import {Injectable} from '@angular/core';
import {ToastController} from 'ionic-angular';

@Injectable()
export class TipService {
  constructor(private toastCtrl: ToastController) {}

  showServerResponseSuccess(message: string): void{
    const toast = this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'top'
    });
    toast.present().then(() => {
    });
  }
}

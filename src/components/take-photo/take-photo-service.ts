import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class TakePhotoService {

    subscription: Subscription;

    constructor(
        public camera: Camera,
        public actionCtrl: ActionSheetController,
        public translate: TranslateService
    ) {
    }

    takePhoto(sourceType: number): Observable<string> {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            sourceType
        };

        return Observable.fromPromise(this.camera.getPicture(options));
    }

    showActionSheet(subject: Subject<string>, buttonText: { [key: string]: string }) {

        const actionSheet = this.actionCtrl.create({
            buttons: [
                {
                    text: buttonText.TAKE_PHOTO,
                    handler: () => {
                        this.subscription && this.subscription.unsubscribe();

                        this.subscription = this.takePhoto(this.camera.PictureSourceType.CAMERA).subscribe(url => subject.next(url));
                    }
                }, {
                    text: buttonText.PICK_PHOTO,
                    handler: () => {
                        this.subscription && this.subscription.unsubscribe();

                        this.subscription = this.takePhoto(this.camera.PictureSourceType.PHOTOLIBRARY).subscribe(url => subject.next(url));
                    }
                }, {
                    text: buttonText.CANCEL_BUTTON,
                    role: 'cancel',
                    handler: () => subject.next('')
                }
            ]
        });

        actionSheet.present().then(() => { });
    }
}

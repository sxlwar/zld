import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class TakePhotoService {

    subscription: Subscription;

    constructor(
        private camera: Camera,
        private actionCtrl: ActionSheetController
    ) {
    }

    takePhoto(sourceType: number): Observable<string> {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL, // file uri may have compatibility issue on hua wei.
            encodingType: this.camera.EncodingType.JPEG,
            sourceType,
        };

        return Observable.fromPromise(this.camera.getPicture(options))
            .map(data => `data:image/jpeg;base64,${data}`);
    }

    showActionSheet(subject: Subject<string>, buttonText: { [key: string]: string }) {

        const actionSheet = this.actionCtrl.create({
            buttons: [
                {
                    text: buttonText.TAKE_PHOTO,
                    handler: () => {
                        this.subscription && this.subscription.unsubscribe();

                        this.subscription = this.takePhoto(this.camera.PictureSourceType.CAMERA).subscribe(url => subject.next(url));
                    },
                }, {
                    text: buttonText.PICK_PHOTO,
                    handler: () => {
                        this.subscription && this.subscription.unsubscribe();

                        this.subscription = this.takePhoto(this.camera.PictureSourceType.PHOTOLIBRARY).subscribe(url => subject.next(url));
                    },
                }, {
                    text: buttonText.CANCEL_BUTTON,
                    role: 'cancel',
                    handler: () => subject.next(''),
                },
            ],
        });

        actionSheet.present().then(() => { });
    }
}

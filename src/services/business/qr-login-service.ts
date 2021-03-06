import { Injectable } from '@angular/core';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ResetQRSidAction, SetQRCodeAction } from './../../actions/action/qr-scan-login-action';
import { AppState, selectQRCode, selectQRLoginResponse } from './../../reducers/index-reducer';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';
import { UserService } from './user-service';

@Injectable()
export class QRLoginService {

    constructor(
        private store: Store<AppState>,
        private error: ErrorService,
        private processor: ProcessorService,
        private userInfo: UserService,
        private scanner: QRScanner,
        private translate: TranslateService
    ) {

    }

    resetQRCode(): void {
        this.store.dispatch(new ResetQRSidAction());
    }

    scanToLogin(): Subscription[] {
        return [
            this.setQRCode(),

            this.permissionDenied(),

            this.qrLogin(),

            this.handleError(),
        ];
    }

    private setQRCode(): Subscription {
        return Observable.fromPromise(this.scanner.prepare()).filter(status => status.authorized)
            .do(_ => this.scanner.show())
            .mergeMapTo(this.scanner.scan())
            .subscribe((code: string) => {
                this.store.dispatch(new SetQRCodeAction(code));
                this.scanner.hide();
            })
    }

    private permissionDenied(): Subscription {
        const msg = Observable.fromPromise(this.scanner.prepare())
            .filter(status => status.denied)
            .mergeMapTo(this.translate.get('CAMERA_PERMISSION_DENIED')
                .map(errorMessage => ({ errorMessage }))
            )

        return this.error.handleErrorInSpecific(msg, 'PERMISSION_DENIED');
    }

    private qrLogin(): Subscription {
        return this.processor.qrLoginProcessor(
            this.store.select(selectQRCode)
                .filter(value => !!value).withLatestFrom(this.userInfo.getSid(), (qr_sid, sid) => ({ sid, qr_sid }))
        );
    }

    private handleError(): Subscription {
        return this.error.handleApiRequestError(this.store.select(selectQRLoginResponse));
    }
}

import { Certificate } from './../../interfaces/response-interface';
import { CertificateAddOptions, CertificateUpdateOptions, UploadCertificateImageOptions } from './../../interfaces/request-interface';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AppState, selectCertificateListResponse, selectCertificateAddResponse, selectCertificateDeleteResponse, selectCertificateUpdateResponse, selectCertificateAddOptions, selectCertificateUpdateOptions } from './../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { UserService } from './user-service';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';
import { Injectable } from '@angular/core';

@Injectable()
export class WorkCertificateService {

    constructor(
        private store: Store<AppState>,
        private error: ErrorService,
        private processor: ProcessorService,
        private userInfo: UserService
    ) { }

    /* ==================================================Request methods========================================= */

    getCertificateList(): Subscription {
        return this.processor.certificateListProcessor(this.userInfo.getSid().map(sid => ({ sid })));
    }

    addCertificate(option: Observable<CertificateAddOptions>): Subscription {
        return this.processor.certificateAddProcessor(option
            .withLatestFrom(this.userInfo.getSid(), (option, sid) => ({ ...option, sid }))
        );
    }

    deleteCertificate(id: Observable<number>): Subscription {
        return this.processor.certificateDeleteProcessor(id.withLatestFrom(this.userInfo.getSid(), (work_certificate_id, sid) => ({ sid, work_certificate_id })));
    }

    updateCertificate(option: Observable<CertificateUpdateOptions>): Subscription {
        return this.processor.certificateUpdateProcessor(option
            .withLatestFrom(this.userInfo.getSid(), (option, sid) => ({ ...option, sid }))
        );
    }

    updateCertificateImage(): Subscription {
        return this.processor.certificateImageUploadProcessor(
            this.getImagesNeedToUploadAfterAddSuccess()
                .merge(this.getImagesNeedToUploadAfterUpdateSuccess())
        );
    }

    /* =================================================Data acquisition=========================================== */

    getCertificates(): Observable<Certificate[]> {
        return this.store.select(selectCertificateListResponse)
            .filter(value => !!value)
            .map(res => res.work_certificates);
    }

    getCertificateIdOfAddedSuccess(): Observable<number> {
        return this.store.select(selectCertificateAddResponse)
            .filter(value => !!value)
            .map(res => res.work_certificate_id);
    }

    getImagesNeedToUploadAfterAddSuccess(): Observable<UploadCertificateImageOptions> {
        const addResponse = this.store.select(selectCertificateAddResponse);

        const images = this.store.select(selectCertificateAddOptions)
            .mergeMap(({ imageface, imageback }) => Observable
                .from([{ file: imageface, type: 'imageface' }, { file: imageback, type: 'imageback' }])
                .filter(item => !!item.file)
            )
            .withLatestFrom(
            this.userInfo.getSid(),
            addResponse.map(res => res.work_certificate_id),
            (option, sid, id) => ({ ...option, sid, id })
            );

        return addResponse
            .skip(1)
            .filter(res => !!res && !res.errorMessage)
            .mergeMapTo(images);
    }

    getImagesNeedToUploadAfterUpdateSuccess(): Observable<UploadCertificateImageOptions> {
        return this.store.select(selectCertificateUpdateResponse)
            .skip(1)
            .filter(res => !!res && !res.errorMessage)
            .mergeMapTo(this.store.select(selectCertificateUpdateOptions)
                .mergeMap(({ imageface, imageback, id }) => Observable
                    .from([{ file: imageface, type: 'imageface', id }, { file: imageback, type: 'imageback', id }])
                    .filter(item => !!item.file)
                )
            )
            .withLatestFrom(
            this.userInfo.getSid(),
            (option, sid) => ({ ...option, sid })
            );
    }

    /* =================================================Error handle=============================================== */

    handleError(): Subscription[] {
        return [
            this.error.handleErrorInSpecific(this.store.select(selectCertificateListResponse), 'API_ERROR'),
            this.error.handleErrorInSpecific(this.store.select(selectCertificateAddResponse), 'API_ERROR'),
            this.error.handleErrorInSpecific(this.store.select(selectCertificateDeleteResponse), 'API_ERROR'),
            this.error.handleErrorInSpecific(this.store.select(selectCertificateUpdateResponse), 'API_ERROR'),
        ]
    }
}
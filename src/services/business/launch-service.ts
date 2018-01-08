import { MapperService, WorkerContractFormModel } from './../api/mapper-service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AppState, selectMultiProcessResponse, selectProcessResponse, selectWorkerContractOptions } from './../../reducers/index-reducer';
import { UserService } from './user-service';
import { ErrorService } from './../errors/error-service';
import { ProcessorService } from './../api/processor-service';
import { Injectable } from '@angular/core';

@Injectable()
export class LaunchService {

    constructor(
        public store: Store<AppState>,
        public processor: ProcessorService,
        public error: ErrorService,
        public userInfo: UserService,
        public mapper: MapperService
    ) {

    }

    getMultiProcessCreateResponse(): Observable<number[]> {
        return this.store.select(selectMultiProcessResponse)
            .filter(value => !!value)
            .map(res => res.information.map(item => item.WorkerContract_id));
    }

    createWorkerContract(form: Observable<WorkerContractFormModel>): Subscription {
        return this.processor.createWorkerContractProcessor(
            form.map(form => this.mapper.transformWorkerContractForm(form))
                .withLatestFrom(this.userInfo.getSid(), (form, sid) => ({ ...form, sid }))
        );
    }

    uploadWorkerContractAttach(): Subscription {
        return this.processor.uploadWorkerContractAttachProcessor(
            this.store.select(selectWorkerContractOptions)
                .filter(value => !!value)
                .mergeMap(option => Observable.from(option.worker_contract.attach))
                .withLatestFrom(
                this.getMultiProcessCreateResponse().mergeMap(res => Observable.from(res).first()),
                this.userInfo.getSid(),
                (file, id, sid) => ({ id, file, sid })
                )
        );
    }

    handleMultiProcessError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectMultiProcessResponse), 'API_ERROR');
    }

    handlerProcessError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectProcessResponse), 'API_ERROR');
    }
}
import { LogoutResponse } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, selectLogoutResponse } from './../../reducers/index-reducer';
import { Subscription } from 'rxjs/Subscription';
import { ErrorService } from './../errors/error-service';
import { ProcessorService } from './../api/processor-service';
import { UserService } from './user-service';
import { Injectable } from '@angular/core';
import { ResetLogoutResponseAction } from '../../actions/action/logout-action';


@Injectable()
export class LogoutService {
    constructor(
        private store: Store<AppState>,
        private userInfo: UserService,
        private processor: ProcessorService,
        private error: ErrorService
    ) { }

    logout(): Subscription {
        return this.processor.logoutProcessor(this.userInfo.getSid().take(1).map(sid => ({ sid })));
    }

    getLogout(): Observable<LogoutResponse> {
        return this.store.select(selectLogoutResponse).filter(value => value !== null && !value.errorMessage);
    }

    resetResponse(): void {
        this.store.dispatch(new ResetLogoutResponseAction());
    }

    handleError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectLogoutResponse), 'API_ERROR');
    }
}
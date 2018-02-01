import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/takeUntil';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { SEARCH_COMPANY, SearchCompanyAction } from '../actions/action/search-company-action';
import { ResponseAction } from '../interfaces/response-interface';
import { Command } from '../services/api/command';
import { WebsocketService } from '../services/api/websocket-service';
import { SearchCompanyFailAction, SearchCompanySuccessAction } from './../actions/action/search-company-action';

@Injectable()
export class SearchCompanyEffect extends Command {
    @Effect()
    searchCompany$: Observable<ResponseAction> = this.actions$
        .ofType(SEARCH_COMPANY)
        .mergeMap((action: SearchCompanyAction) => this.ws
            .send(this.searchCompany(action.payload))
            .takeUntil(this.actions$.ofType(SEARCH_COMPANY))
            .map(msg => msg.isError
                ? new SearchCompanyFailAction(msg.data)
                : new SearchCompanySuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );


    constructor(
        private actions$: Actions,
        private ws: WebsocketService
    ) {
        super();
    }
}

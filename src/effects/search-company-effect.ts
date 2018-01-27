import { SearchCompanyFailAction, SearchCompanySuccessAction } from './../actions/action/search-company-action';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { WebsocketService } from '../services/api/websocket-service';
import { Observable } from 'rxjs/Observable';
import { SEARCH_COMPANY, SearchCompanyAction } from '../actions/action/search-company-action';
import { Command } from '../services/api/command';
import { ResponseAction } from '../interfaces/response-interface';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/catch';

@Injectable()
export class SearchCompanyEffect extends Command {
    @Effect()
    searchCompany$: Observable<ResponseAction> = this.actions$
        .ofType(SEARCH_COMPANY)
        .mergeMap((action: SearchCompanyAction) => this.ws
            .send(this.searchCompany(action.payload))
            .takeUntil(this.actions$.ofType(SEARCH_COMPANY))
            .map(msg => msg.isError ? new SearchCompanyFailAction(msg.data) : new SearchCompanySuccessAction(msg.data))
            .catch(error => Observable.of(error))
        );


    constructor(
        private actions$: Actions,
        private ws: WebsocketService
    ) {
        super();
    }
}

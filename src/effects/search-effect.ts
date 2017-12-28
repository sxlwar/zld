import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { WebsocketService } from '../services/api/websocket-service';
import { Observable } from 'rxjs/Observable';
import { SEARCH_COMPANY, SearchCompanyCompleteAction, SearchCompanyAction } from '../actions/action/search-action';
import { Command } from '../services/api/command';
import { of } from 'rxjs/observable/of';
import { ResponseAction } from '../interfaces/response-interface';

@Injectable()
export class SearchEffect {
  @Effect()
  searchCompany$: Observable<ResponseAction> = this.actions$
    .ofType(SEARCH_COMPANY)
    .mergeMap((action: SearchCompanyAction) => this.ws
      .send(this.command.searchCompany(action.payload))
      .takeUntil(this.actions$.ofType(SEARCH_COMPANY))
      .map(res => {
        const payload = res.isError ? [] : res.data.companies;
        return new SearchCompanyCompleteAction(payload);
      })
      .catch(error => of(error))
    );


  constructor(
    public actions$: Actions,
    public ws: WebsocketService,
    public command: Command
  ) {
  }
}



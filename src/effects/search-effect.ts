import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {WebsocketService} from '../serveices/api/websocket-service';
import {Observable} from 'rxjs/Observable';
import {SEARCH_COMPANY, SearchCompanyCompleteAction} from '../actions/search-action';
import {Command} from '../serveices/api/command';
import {of} from 'rxjs/observable/of';
import {RequestAction} from '../interfaces/request-interface';

@Injectable()
export class SearchEffect {
  @Effect()
  searchCompany$: Observable<RequestAction> = this.actions$
    .ofType(SEARCH_COMPANY)
    .mergeMap((action: RequestAction) => this.ws
      .send(this.command.searchCompany(action.payload))
      .takeUntil(this.actions$.ofType(SEARCH_COMPANY))
      .map(res => {
        const payload = res.isError ? [] : res.data.companies;
        return new SearchCompanyCompleteAction(payload);
      })
      .catch(error => of(error))
    );


  constructor(public actions$: Actions,
              public ws: WebsocketService,
              public command: Command) {
  }
}



import {Company, WorkerResponse} from '../interfaces/response-interface';
import {SearchCompanyOptions} from '../interfaces/request-interface';

export const SEARCH_COMPANY = 'SEARCH_COMPANY';

export class SearchCompanyAction {
  readonly type = SEARCH_COMPANY;

  constructor(public payload: SearchCompanyOptions) {
  }
}

export const SEARCH_WORKER = 'SEARCH_WORKER';

export class SearchWorkerAction {
  readonly type = SEARCH_WORKER;

  constructor(public payload: any) {
  }
}

export const SEARCH_COMPANY_COMPLETE = 'SEARCH_COMPANY_COMPLETE';

export class SearchCompanyCompleteAction {
  readonly type = SEARCH_COMPANY_COMPLETE;

  constructor(public payload: Company[]) {
  }
}

export const SEARCH_WORKER_COMPLETE = 'SEARCH_WORKER_COMPLETE';

export class SearchWorkerCompleteAction {
  readonly type = SEARCH_WORKER_COMPLETE;

  constructor(public payload: WorkerResponse[]) {
  }
}

export const SELECT_COMPANY = 'SELECT_COMPANY';

export class SelectCompanyAction {
  readonly type = SELECT_COMPANY;

  constructor(public payload: number){}
}

export type  Actions = SearchCompanyAction
  | SearchWorkerAction
  | SearchCompanyCompleteAction
  | SelectCompanyAction
  | SearchWorkerCompleteAction;

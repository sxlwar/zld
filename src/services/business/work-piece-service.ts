//region
import { orderBy } from 'lodash';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState, selectWorkPieceResponse, selectWorkPiecePay, selectWorkPieceFinishFlow } from '../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { ErrorService } from '..//errors/error-service';
import { ProcessorService } from '..//api/processor-service';
import { Observable } from 'rxjs/Observable';
import { WorkPiece, WorkPieceFinish } from '../../interfaces/response-interface';
import { RequestOption, RequestStatus } from '../../interfaces/request-interface';
import { UserService } from '..//business/user-service';
import { ProjectService } from '..//business/project-service';
//endregion

@Injectable()
export class WorkPieceService {
    subscriptions: Subscription[] = [];
    workPiece$$: Subscription;

    constructor(
        public store: Store<AppState>,
        public error: ErrorService,
        public process: ProcessorService,
        public userInfo: UserService,
        public project: ProjectService,
    ) {
        this.handleError();
    }

    /* ====================================Data acquisition=======================================  */

    getWorkPieces(): Observable<WorkPiece[]> {
        return this.store.select(selectWorkPiecePay);
    }

    getWorkPieceFinish(): Observable<WorkPieceFinish[]> {
        return this.store.select(selectWorkPieceFinishFlow);
    }

    getWorkPieceList(option: Observable<RequestOption>): Subscription {
        const sid = this.userInfo.getSid();

        const params = sid.zip(option, (sid, option) => ({ sid, ...option }));

        return this.process.workPieceListProcessor(params);
    }

    getCompletePieceOfCurrentProject() {
        const option = this.project.getProjectId().map(id => ({ project_id: id, request_status: RequestStatus.completed }));

        this.getWorkPieceList(option);
    }

    getPieceById(id: number): Observable<WorkPiece> {
        return this.getWorkPieces()
            .mergeMap(source => Observable.from(source).find(item => item.id === id));
    }

    getFinishedPiecesById(id: number): Observable<WorkPieceFinish[]> {
        return this.getWorkPieceFinish()
            .mergeMap(source => Observable.from(source)
                .filter(item => item.workpieces_id === id)
                .reduce((acc, cur) => {
                    acc.push(cur);
                    return acc;
                }, [])
                .map(result => orderBy(result, ['finish_date'], ['desc']))
            );
    }

    /* ====================================Request option shortcut methods=======================================  */

    getCompleteOption(): Observable<RequestOption> {
        return Observable.of({ request_status: RequestStatus.completed });
    }

    getHistoryOption(): Observable<RequestOption> {
        return Observable.of({ history_view: true });
    }

    /* ====================================Error handle and refuse clean=======================================  */

    private handleError() {
        const error = this.store.select(selectWorkPieceResponse);

        this.workPiece$$ = this.error.handleErrorInSpecific(error, 'APP_ERROR');
    }

    unSubscribe() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { orderBy } from 'lodash';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { RequestOption, RequestStatus } from '../../interfaces/request-interface';
import { WorkPiece, WorkPieceFinish } from '../../interfaces/response-interface';
import {
    AppState,
    selectWorkPieceFinishFlow,
    selectWorkPieceResponse,
    selectWorkPieces,
} from '../../reducers/index-reducer';
import { ProcessorService } from '..//api/processor-service';
import { ProjectService } from '../business/project-service';
import { UserService } from '../business/user-service';
import { ErrorService } from '../errors/error-service';
import { putInArray } from '../utils/util';
import { RecordOptionService } from './record-option-service';

@Injectable()
export class WorkPieceService extends RecordOptionService {

    constructor(
        private store: Store<AppState>,
        private error: ErrorService,
        private process: ProcessorService,
        private userInfo: UserService,
        private project: ProjectService
    ) {
        super();
    }

    /* ====================================Data acquisition=======================================  */

    getWorkPieces(): Observable<WorkPiece[]> {
        return this.store.select(selectWorkPieces).filter(res => !!res.length);
    }

    getWorkPieceFinish(): Observable<WorkPieceFinish[]> {
        return this.store.select(selectWorkPieceFinishFlow).filter(res => !!res.length);
    }

    getWorkPieceList(option: Observable<RequestOption>): Subscription {
        return this.process.workPieceListProcessor(option.withLatestFrom(this.userInfo.getSid(), (option, sid) => ({ ...option, sid })));
    }

    getCompletePieceOfCurrentProject(): Subscription {
        const option = this.project.getProjectId().map(id => ({ project_id: id, request_status: RequestStatus.completed }));

        return this.getWorkPieceList(option);
    }

    getPieceById(id: number): Observable<WorkPiece> {
        return this.getWorkPieces()
            .mergeMap(source => Observable.from(source).find(item => item.id === id));
    }

    getFinishedPiecesById(id: number): Observable<WorkPieceFinish[]> {
        return this.getWorkPieceFinish()
            .mergeMap(source => Observable.from(source)
                .filter(item => item.workpieces_id === id)
                .reduce(putInArray, [])
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

    /* ==========================================Error handle======================================================  */

    handleError() {
        return this.error.handleApiRequestError(this.store.select(selectWorkPieceResponse));
    }
}

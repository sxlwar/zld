import { putInArray } from '../utils/util';
import { RecordOptionService } from './record-option-service';
import { orderBy } from 'lodash';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState, selectWorkPieceResponse, selectWorkPieces, selectWorkPieceFinishFlow } from '../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { ErrorService } from '../errors/error-service';
import { ProcessorService } from '..//api/processor-service';
import { Observable } from 'rxjs/Observable';
import { WorkPiece, WorkPieceFinish } from '../../interfaces/response-interface';
import { RequestOption, RequestStatus } from '../../interfaces/request-interface';
import { UserService } from '../business/user-service';
import { ProjectService } from '../business/project-service';

@Injectable()
export class WorkPieceService extends RecordOptionService {

    constructor(
        public store: Store<AppState>,
        public error: ErrorService,
        public process: ProcessorService,
        public userInfo: UserService,
        public project: ProjectService,
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

    /* ====================================Error handle=======================================  */

    handleError() {
        return this.error.handleErrorInSpecific(this.store.select(selectWorkPieceResponse), 'APP_ERROR');
    }
}

//region
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState, selectWorkPieceResponse, selectWorkPiecePay, selectWorkPieceFinishFlow } from '../../reducers/index-reducer';
import { Store } from '@ngrx/store';
import { ErrorService } from '..//errors/error-service';
import { ProcessorService } from '..//api/processor-service';
import { Observable } from 'rxjs/Observable';
import { WorkPiece, WorkPieceFinish } from '../../interfaces/response-interface';
import { RequestOption } from '../../interfaces/request-interface';
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
    ){
        this.handleError();
    }

    getWorkPieces(option: Observable<RequestOption>): Observable<WorkPiece[]>{
        this.getWorkPieceList(option);

        return this.store.select(selectWorkPiecePay);
    }

    getWorkPieceFinish(option: Observable<RequestOption>): Observable<WorkPieceFinish[]> {
        this.getWorkPieceList(option);

        return this.store.select(selectWorkPieceFinishFlow);
    }

    getWorkPieceList(option: Observable<RequestOption>): void {
        const sid = this.userInfo.getSid();

        const params = sid.zip(option, (sid,option) => ({sid, ...option}));

        const subscription = this.process.workPieceListProcessor(params);

        this.subscriptions.push(subscription);
    }

    getCompletePieceOfCurrentProject() {
        const option = this.project.getProjectId().map(id => ({project_id: id, request_status: '完成'}));

        this.getWorkPieceList(option);
    }

    /* ====================================Error handle and refuse clean=======================================  */

    private handleError() {
        const error = this.store.select(selectWorkPieceResponse);

        this.workPiece$$ = this.error.handleErrorInSpecific(error, 'APP_ERROR');
    }

    unSubscribe(){
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}

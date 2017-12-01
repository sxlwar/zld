import { Observable } from 'rxjs/Observable';
import { AttendanceMachine } from './../../interfaces/response-interface';
import { ProjectService } from './project-service';
import { ErrorService } from './../errors/error-service';
import { UserService } from './user-service';
import { ProcessorService } from './../api/processor-service';
import { Store } from '@ngrx/store';
import { AppState, selectMachineListResponse, selectMachines } from './../../reducers/index-reducer';
import { Subscription } from 'rxjs/Subscription';
import { Injectable } from '@angular/core';

@Injectable()
export class AttendanceMachineService {
    subscriptions: Subscription[] = [];

    machine$$: Subscription;

    constructor(
        public store: Store<AppState>,
        public process: ProcessorService,
        public userInfo: UserService,
        public project: ProjectService,
        public error: ErrorService
    ) {
        this.handleError();
    }

    getMachineList(): Subscription {
        const sid = this.userInfo.getSid();

        const projectId = this.project.getProjectId();

        const option = sid.zip(projectId, (sid, project_id) => ({ sid, project_id }));

        return this.process.attendanceMachineListProcessor(option);
    }

    getMachines(): Observable<AttendanceMachine[]> {
        return this.store.select(selectMachines);
    }

    getMachineName(id: number): Observable<string> {
        return this.getMachines()
            .mergeMap(machines => Observable.from(machines)
                .filter(machine => machine.id === id)
                .map(machine => machine.name)
            );
    }

    /* ========================================Error handle and refuse clean======================================== */
    
    handleError() {
        const error = this.store.select(selectMachineListResponse);

        this.machine$$ = this.error.handleErrorInSpecific(error, 'API_ERROR');
    }

    unSubscribe() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}
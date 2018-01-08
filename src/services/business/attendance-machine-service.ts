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

    constructor(
        public store: Store<AppState>,
        public process: ProcessorService,
        public userInfo: UserService,
        public project: ProjectService,
        public error: ErrorService
    ) {
    }

    getMachineList(): Subscription {
        return this.process.attendanceMachineListProcessor(
            this.userInfo.getSid().zip(
                this.project.getProjectId(),
                (sid, project_id) => ({ sid, project_id })
            )
        );
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

    handleError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectMachineListResponse), 'API_ERROR');
    }
}
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AttendanceMachine } from './../../interfaces/response-interface';
import { AppState, selectMachineListResponse, selectMachines } from './../../reducers/index-reducer';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';
import { ProjectService } from './project-service';
import { UserService } from './user-service';

@Injectable()
export class AttendanceMachineService {

    constructor(
        private store: Store<AppState>,
        private process: ProcessorService,
        private userInfo: UserService,
        private project: ProjectService,
        private error: ErrorService
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

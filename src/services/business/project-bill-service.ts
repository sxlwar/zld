import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ProjectPayBill, ProjectPayBillAmount } from './../../interfaces/response-interface';
import { AppState, selectProjectBillList, selectProjectBillResponse } from './../../reducers/index-reducer';
import { ProcessorService } from './../api/processor-service';
import { ErrorService } from './../errors/error-service';
import { ProjectService } from './project-service';
import { UserService } from './user-service';

@Injectable()
export class ProjectBillService {
    constructor(
        private store: Store<AppState>,
        private process: ProcessorService,
        private error: ErrorService,
        private userInfo: UserService,
        private project: ProjectService
    ) {
    }

    getProjectPayBills(): Observable<ProjectPayBill[]> {
        return this.store.select(selectProjectBillList);
    }

    getProjectBillList(id: Observable<number> = Observable.of(null)): Subscription {
        return this.process.projectPayBillProcessor(
            id.combineLatest(
                this.userInfo.getSid(),
                this.project.getProjectId(),
                (id, sid, project_id) => id ? { id, sid, project_id } : { sid, project_id })
        );
    }

    /**
     * @description 以下5个函数纯属也是为了对付后台不友好的API，目的就是一眼能看的出相应的结果是由哪些值计算得来的。
     */
    countAttendanceAmount(bill: ProjectPayBill): number {
        return bill[this.getFullKey(ProjectPayBillAmount.systemAtt)] + bill[this.getFullKey(ProjectPayBillAmount.manualAtt)];
    }

    countOvertimeAmount(bill: ProjectPayBill): number {
        return bill[this.getFullKey(ProjectPayBillAmount.systemOvertime)]
            + bill[this.getFullKey(ProjectPayBillAmount.systemOverOvertime)]
            + bill[this.getFullKey(ProjectPayBillAmount.manualOvertime)]
            + bill[this.getFullKey(ProjectPayBillAmount.manualOverOvertime)];
    }

    countPieceAmount(bill: ProjectPayBill): number {
        return bill[this.getFullKey(ProjectPayBillAmount.pieceActualPay)]
    }

    countAmount(bill: ProjectPayBill): number {
        return this.countAttendanceAmount(bill) + this.countOvertimeAmount(bill) + this.countPieceAmount(bill);
    }

    private getFullKey(key: number | string): string {
        return !!key ? ProjectPayBillAmount.prefix + key + ProjectPayBillAmount.suffix : ProjectPayBillAmount.prefix + '_sum'; //工件，就是pay_bill__amount__sum这个字段,前后缀加起来多一个‘_’
    }

    /* ==========================================================refuse clean===================================================== */

    handleError(): Subscription {
        return this.error.handleErrorInSpecific(this.store.select(selectProjectBillResponse), 'APP_ERROR');
    }
}

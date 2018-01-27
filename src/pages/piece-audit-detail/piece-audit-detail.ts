import { MissionRoot } from './../pages';
import { pieceAudit } from './../../services/business/icon-service';
import { PermissionService } from './../../services/config/permission-service';
import { WorkPieceService } from './../../services/business/work-piece-service';
import { WorkFlowService } from './../../services/business/work-flow-service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { WorkFlow, WorkPieceFinish, WorkPiece } from './../../interfaces/response-interface';
import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-piece-audit-detail',
    templateUrl: 'piece-audit-detail.html',
})
export class PieceAuditDetailPage {

    id: number;

    workFlow: Observable<WorkFlow>;

    pieceFlow: Observable<WorkPieceFinish>;

    piece: Observable<WorkPiece>;

    subscriptions: Subscription[] = [];

    audit$$: Subscription;

    isAuditButtonVisibility: Observable<boolean>;

    constructor(
        private navCtrl: NavController,
        private navParams: NavParams,
        private workFlowService: WorkFlowService,
        private workPiece: WorkPieceService,
        private permission: PermissionService
    ) {
        this.id = navParams.get('id');
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel() {
        this.workFlow = this.workFlowService.getWorkFlow(this.id);

        this.pieceFlow = this.workPiece.getWorkPieceFinish().map(res => res[0]);

        this.isAuditButtonVisibility = this.workFlowService.isAuditButtonVisibility(
            this.navParams.get('status'),
            this.permission.getOperatePermission(pieceAudit.icon, MissionRoot)
        );

        this.piece = this.pieceFlow.withLatestFrom(
            this.workPiece.getWorkPieces(),
            (pieceFinish, pieces) => pieces.find(item => item.id === pieceFinish.workpieces_id)
        )
            .filter(value => !!value)
            .share();
    }

    launch() {
        this.subscriptions = [
            this.workPiece.getWorkPieceList(this.workPiece.getRecordOptions(this.id, this.navParams.get('status'))),

            this.workFlowService.getTaskUpdateSuccessResponse().subscribe(_ => this.navCtrl.pop()),
            
            this.workPiece.handleError(),
        ];
    }

    audit() {
        this.audit$$ && this.audit$$.unsubscribe();

        this.audit$$ = this.workFlowService.auditTask(this.id);
    }

    ionViewWillUnload() {
        this.workFlowService.resetTaskUpdateResponse();
        
        this.audit$$ && this.audit$$.unsubscribe();

        this.subscriptions.forEach(item => item.unsubscribe());
    }

}

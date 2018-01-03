import { WorkPieceService } from './../../services/business/work-piece-service';
import { WorkFlowService } from './../../services/business/work-flow-service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { WorkFlow, WorkPieceFinish, WorkPiece } from './../../interfaces/response-interface';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public workFlowService: WorkFlowService,
    public workPiece: WorkPieceService,

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

    this.piece = this.pieceFlow.withLatestFrom(
      this.workPiece.getWorkPieces(),
      (pieceFinish, pieces) => pieces.find(item => item.id === pieceFinish.workpieces_id)
    )
      .filter(value => !!value)
      .share();
  }

  launch() {
    this.subscriptions = [
      this.workPiece.getWorkPieceList(this.workPiece.getProcessingRecordOptions(this.id)),
      this.workPiece.handleError()
    ];
  }

  audit() {
    this.audit$$ && this.audit$$.unsubscribe();

    this.audit$$ = this.workFlowService.auditTask(this.id);
  }

  ionViewWillUnload() {
    this.audit$$ && this.audit$$.unsubscribe();

    this.subscriptions.forEach(item => item.unsubscribe());
  }

}

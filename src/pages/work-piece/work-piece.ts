import { WorkPieceAxisComponent } from './../../components/work-piece-axis/work-piece-axis';
import { Subscription } from 'rxjs/Subscription';
import { RequestOption } from '../../interfaces/request-interface';
import { ProjectService } from './../../services/business/project-service';
import { WorkPiece } from './../../interfaces/response-interface';
import { Observable } from 'rxjs/Observable';
import { WorkPieceService } from './../../services/business/work-piece-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-work-piece',
  templateUrl: 'work-piece.html',
})
export class WorkPiecePage {
  pieces: Observable<WorkPiece[]>

  subscriptions: Subscription[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public piece: WorkPieceService,
    public project: ProjectService,
    public modal: ModalController
  ) {
  }

  ionViewCanEnter() {
    const { view, opt } = this.navParams.get('permission');

    return opt || view;
  }

  ionViewDidLoad() {
    this.launch();

    this.pieces = this.piece.getWorkPieces();
  }

  launch() {
    this.subscriptions = [
      this.piece.getWorkPieceList(this.getOption()),
      this.piece.handleError()
    ];
  }

  getOption(): Observable<RequestOption> {
    return this.project.getProjectId().zip(
      this.piece.getCompleteOption(),
      this.piece.getHistoryOption(),
      (project_id, statue, history) => ({ project_id, ...statue, ...history })
    );
  }

  showStatistics(source: WorkPiece): void {
    this.modal.create(WorkPieceAxisComponent, { id: source.id }).present();
  }

  ionViewWillUnload(){
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}

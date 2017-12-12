import { WorkPieceService } from './../../services/business/work-piece-service';
import { Observable } from 'rxjs/Observable';
import { WorkPieceFinish, WorkPiece } from './../../interfaces/response-interface';
import { NavParams, ViewController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'work-piece-axis',
  templateUrl: 'work-piece-axis.html'
})
export class WorkPieceAxisComponent implements OnInit {

  piece: Observable<WorkPiece>;

  pieces: Observable<WorkPieceFinish[]>;

  constructor(
    public navParams: NavParams,
    public pieceService: WorkPieceService,
    public viewCtrl: ViewController
  ) {
  }

  ngOnInit() {
    const id = this.navParams.get('id');

    this.piece = this.pieceService.getPieceById(id)
      .filter(value => !!value);

    this.pieces = this.pieceService.getFinishedPiecesById(id);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
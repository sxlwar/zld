import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { WorkPiece, WorkPieceFinish } from './../../interfaces/response-interface';
import { WorkPieceService } from './../../services/business/work-piece-service';

@Component({
    selector: 'work-piece-axis',
    templateUrl: 'work-piece-axis.html',
})
export class WorkPieceAxisComponent implements OnInit {

    piece: Observable<WorkPiece>;

    pieces: Observable<WorkPieceFinish[]>;

    constructor(
        private navParams: NavParams,
        private pieceService: WorkPieceService,
        private viewCtrl: ViewController
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

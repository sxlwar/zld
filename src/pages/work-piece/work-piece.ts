import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { RequestOption } from '../../interfaces/request-interface';
import { WorkPieceAxisComponent } from './../../components/work-piece-axis/work-piece-axis';
import { WorkPiece } from './../../interfaces/response-interface';
import { ProjectService } from './../../services/business/project-service';
import { WorkPieceService } from './../../services/business/work-piece-service';

@IonicPage()
@Component({
    selector: 'page-work-piece',
    templateUrl: 'work-piece.html',
})
export class WorkPiecePage {
    pieces: Observable<WorkPiece[]>

    subscriptions: Subscription[] = [];

    constructor(
        private navParams: NavParams,
        private piece: WorkPieceService,
        private project: ProjectService,
        private modal: ModalController
    ) {
    }

    ionViewCanEnter() {
        const { view, opt } = this.navParams.get('permission');

        return opt || view;
    }

    ionViewDidLoad() {
        this.initialModel();

        this.launch();
    }

    initialModel(): void {
        this.pieces = this.piece.getWorkPieces();
    }

    launch(): void {
        this.subscriptions = [
            this.piece.getWorkPieceList(this.getOption()),

            this.piece.handleError(),
        ];
    }

    getOption(): Observable<RequestOption> {
        return this.project.getProjectId()
            .zip(
            this.piece.getCompleteOption(),
            this.piece.getHistoryOption(),
            (project_id, statue, history) => ({ project_id, ...statue, ...history })
            );
    }

    showStatistics(source: WorkPiece): void {
        this.modal.create(WorkPieceAxisComponent, { id: source.id }).present();
    }

    ionViewWillUnload() {
        this.subscriptions.forEach(item => item.unsubscribe());
    }
}

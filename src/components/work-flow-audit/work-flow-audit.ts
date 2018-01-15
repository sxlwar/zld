import { MissionListItem } from './../../interfaces/mission-interface';
import { NavParams, ViewController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'work-flow-audit',
    templateUrl: 'work-flow-audit.html'
})
export class WorkFlowAuditComponent implements OnInit {
    list: MissionListItem[];

    comment: string;

    cancelButtonText = 'REJECT';

    confirmButtonText = 'PASS';

    constructor(
        public navParams: NavParams,
        public viewCtrl: ViewController
    ) {
        this.list = navParams.get('list');
    }

    ngOnInit() {
        if (this.list[0].isRequester) {
            this.cancelButtonText = 'CANCEL_BUTTON';
            this.confirmButtonText = 'REAPPLY';
        }
    }

    execution(approve: boolean): void {
        this.viewCtrl.dismiss({ approve, comment: this.comment, ids: this.list.map(item => item.taskId) });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}

import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { MissionListItem } from './../../interfaces/mission-interface';

@Component({
    selector: 'work-flow-audit',
    templateUrl: 'work-flow-audit.html',
})
export class WorkFlowAuditComponent implements OnInit {
    list: MissionListItem[];

    comment: string;

    cancelButtonText = 'REJECT';

    confirmButtonText = 'PASS';

    constructor(
        private navParams: NavParams,
        private viewCtrl: ViewController
    ) {
        this.list = <MissionListItem[]>this.navParams.get('list');
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
